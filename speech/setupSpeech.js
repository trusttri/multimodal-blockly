
var recognition = new webkitSpeechRecognition();
var TIMEOUT = 500;
var waitingForParams = false;
var saidSetVariable = false;
var saidGetVariable = false;
var paramsChosen = [];
var blockChosen;
var paused = true;
var result;
var parser;
var str = "";
var candidateParam = ["parameter", "param", "barometer", "input"]
var candidateSet = [ "set variable", "set barrier", "set terrible", "set durable", "set the", "set bearable"]
var candidateGet = [ "get variable", "get barrier", "get terrible", "get durable", "get the", "get bearable"]
var candidatePlay = ["play", "go", "run", "start"]
var candidateDirection = ["up", "down", "left", "right", "forward", "backward"];
var candidateDelete = ["delete", "remove"]
var candidateNumber = ["one"];
var candidateColor = ["red", "blue", "green"];
var candidateBool = ["true", "false"];


recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en";


recognition.onstart = function(){
    paused = false;
}

recognition.onend = function(event){

    setTimeout(function(){
        recognition.start();
        paused = false;
    }, TIMEOUT)
}

recognition.onresult = function(event) {
    //need to write the functions for param here
    var interim = "";
    var final = "";
    var processed = false;
    if (typeof(event.results) == 'undefined') {
       console.log("undefined")
    }

    for (var i = 0; i < event.results.length; i++) {
        //console.log(event.results);
        var result = event.results[i];
        if (result.isFinal) {
            final = result[0].transcript;
            document.getElementById('user-said').innerHTML = "Final: \"" + final + '\"';
        } else {
            interim += result[0].transcript;
            document.getElementById('user-said').innerHTML = "Inter: \"" + interim + '\"';
        }
    }

    //also check if user is hovering over a block in viewer
    if (userSaidParam(interim)) {
        if(Blockly.selected){
            blockChosen = Blockly.selected;
        }
        //console.log("in param");
        //showParameterModal(blockChosen);
        waitingForParams = true;
        processed = true;
    } else if (userSaidSetVariable(interim)) {
       // console.log("in set variable");
        saidSetVariable = true;
        processed = true;
    } else if (userSaidGetVariable(interim)) {
        //console.log("in get variable");
        saidGetVariable = true;
        processed = true;
    } else if (userSaidPlay(interim)) {
       // console.log("in play");
        if(control.blocks.length > 0){
            Code.runJS();
            generateSpeech("play!");
            processed = true;
        }
    } else if (userSaidDelete(interim)){
        //console.log("delete");
        deleteBlock();
    }

    //setting parameters.
    if(waitingForParams && blockChosen != null){
        var processedInterim = processNumbers(interim);
        //get the parameters sequentially.
        if(processedInterim != ""){
            var grammar = grammarInfo[blockChosen.type]
            parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
            console.log(blockChosen.type);
            try {
                console.log(processedInterim);
                str = processedInterim;
                parser.feed(processedInterim);
                console.log("---------RESULTS--------");
                var result = parser.results[0];
                console.log(result);
                processParamsChosen(result, blockChosen);

                //process ended
                processed = true;
                waitingForParams = false;
            } catch(parseError) {
                console.log(
                    "Error at character " + parseError.offset
                ); // "Error at character 2"
            }
        }

    }

    //setting variables
    if(saidSetVariable){

    }

    //get variable
    if(saidGetVariable){

    }




    //if end of process restart
    if(processed){
        console.log("processed. stop");
        recognition.stop();
        paused = true;
    }

}

recognition.onspeechend = function() {

    recognition.stop();
    paused = true;
}


/* helper functions for speech */

userSaid = function(str, commands){
    commands = commands.split(" ");
    //all should be included
    for (var i = 0; i < commands.length; i++) {
        if (str.indexOf(commands[i]) < 0){
            return false;
        }
    }
    return true;
}

userSaidParam = function(transcript){
    for (var i=0 ; i<candidateParam.length ; i++){
        var candidate = candidateParam[i];
        if(userSaid(transcript, candidate)){
            return true
        }
    }
    return false;
}

userSaidNumber = function(transcript){
    for (var i=0 ; i<candidateNumber.length ; i++){
        var candidate = candidateNumber[i];
        if(userSaid(transcript, candidate)){
            return true
        }
    }
    return false;
}

userSaidSetVariable = function(transcript){

    for (var i=0 ; i<candidateSet.length ; i++){
        var candidate = candidateSet[i];
        if(userSaid(transcript, candidate)){
            return true
        }
    }
    return false;
}

userSaidGetVariable= function(transcript){
    for (var i=0 ; i<candidateGet.length ; i++){
        var candidate = candidateGet[i];
        if(userSaid(transcript, candidate)){
            return true
        }
    }
    return false;
}

userSaidPlay = function(transcript){

    for (var i=0 ; i<candidatePlay.length ; i++){
        var candidate = candidatePlay[i];
        if(userSaid(transcript, candidate)){
            return true
        }
    }
    return false;
}

// userSaidNumber = function(trancript){
//     var patt = new RegExp("[0-9]+");
//     var res = patt.test(transcript);
//     return res
// }

userSaidDirection = function(transcript){
    for(var i=0; i<candidateDirection.length; i++){
        candidate = candidateDirection[i];
        if(userSaid(transcript, candidate)){
            return true
        }
    }
    return false;
}


userSaidDelete = function(transcript){
    for(var i=0; i<candidateDelete.length; i++){
        candidate = candidateDelete[i];
        if(userSaid(transcript, candidate)){
            return true
        }
    }
    return false;
}

userSaidColor = function(transcript){
    for(var i=0; i<candidateColor.length; i++){
        candidate = candidateColor[i];
        if(userSaid(transcript, candidate)){
            return true
        }
    }
    return false;
}

userSaidDirection = function(transcript){
    for(var i=0; i<candidateDirection.length; i++){
        candidate = candidateDirection[i];
        if(userSaid(transcript, candidate)){
            return true
        }
    }
    return false;
}


processParamsChosen = function(parseResult, blockChosen){

    var parametersInfo = JSON.parse(sessionStorage["paramInfo"]);
    console.log("---------params-----------");
    var paramsChosen = processResult(parseResult);
    console.log(paramsChosen);
    var blockInfo = parametersInfo[blockChosen.type];

    for(var i=0; i<paramsChosen.length; i++){
        var paramChosen = paramsChosen[i];
        var paramFormat = blockInfo[i]["form"];
        var paramName = blockInfo[i]["name"];
        if(paramFormat == "input"){
            //math_number block does not have any child blocks
            if(blockChosen.type == "math_number"){
                blockChosen.setFieldValue(paramsChosen, "NUM");
            }else{
                console.log(blockChosen.childBlocks_[idx]);
                var idx = blockInfo[i]["idx"];
                //below is only possible because currently there are only number input blocks
                blockChosen.childBlocks_[idx].setFieldValue(paramChosen , "NUM");
            }
        }else if(paramFormat == "field"){
            if(blockChosen.type == "set_color"){
                if(paramChosen == "red"){
                    paramChosen = "#ff0000";
                }else if(paramChosen == "blue"){
                    paramChosen = "#0000ff";
                }else if(paramChosen == "green"){
                    paramChosen = "#00ff00";
                }else if(paramChosen == "yellow") {
                    paramChosen = "#ffff00";
                }

            }
            blockChosen.setFieldValue(paramChosen , paramName);
        }
    }
    /*
     //for setting field
     //instead of direction put field name
     Blockly.selected.setFieldValue("down", "direction");


     //for numbers
     Blockly.selected.setFieldValue("3", "NUM")



     Blockly.selected.childBlocks_[2].setFieldValue(110, "NUM")

     Blockly.selected.setFieldValue("#eeffee","color")

     Blockly.selected.setFieldValue("false","BOOL")
     */
}

processNumbers = function(transcript){
    var numbers = {0:["zero"], 1:["one", "on"], 2:["to", "two"], 3:["three"], 4:["for", "four"], 5:["five"],
        6:["six"], 7:["seven"], 8:["eight"], 9:["nine"], 10:["ten"]
    };
    Object.keys(numbers).forEach(function(num){
        var candidates = numbers[num];
        candidates.forEach(function(candidate){
            transcript = (transcript.trim()).replace(candidate, num.toString());
        })
    })
    return transcript;
}


processResult = function(result){
    var params = [];
    result.forEach(function(container){
        var splits = container[0];
        console.log("splits");
        console.log(container);
        console.log(splits);
        if(typeof splits == "string"){
            if(splits != " "){
                params.push(splits);
            }

        }else if(typeof splits == "object"){
            var str = "";
            splits.forEach(function(element){
                str += element;
            })
            params.push(str);
        }else{
            console.log(splits);
        }
    })
    return params;
}

recognition.start();

var voicesReady = false;
window.speechSynthesis.onvoiceschanged = function() {
    voicesReady = true;
    // Uncomment to see a list of voices
    //console.log("Choose a voice:\n" + window.speechSynthesis.getVoices().map(function(v,i) { return i + ": " + v.name; }).join("\n"));
};
var generateSpeech = function(message, callback) {
    if (voicesReady) {
        var msg = new SpeechSynthesisUtterance();
        msg.voice = window.speechSynthesis.getVoices()[2];
        msg.text = message;
        msg.rate = 0.2;
        if (typeof callback !== "undefined")
            msg.onend = callback;
        speechSynthesis.speak(msg);
    }
};

