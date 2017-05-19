
var recognition = new webkitSpeechRecognition();
var TIMEOUT = 500;
var waitingForParams = false;
var blockChosen;
var paused = true;
var result;
var parser;
var str = "";
var candidateParam = ["parameter", "param", "barometer", "input", "durometer"];
var candidatePlay = ["run", "Run", "letsrun"];
var candidateDelete = ["delete", "remove"];
var candidateStop = ["stop"];
var processed;

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
    processed = false;

    if (typeof(event.results) == 'undefined') {
       console.log("undefined")
    }

    for (var i = 0; i < event.results.length; i++) {
        var result = event.results[i];
        if (result.isFinal) {
            final = result[0].transcript;
            document.getElementById('user-said').innerHTML = "Final: \"" + final + '\"';
        } else {
            interim += result[0].transcript;
            document.getElementById('user-said').innerHTML = "Inter: \"" + interim + '\"';
        }
    }

    var processedInterim = processInterim(interim);

    //first check for variable related functions
    setValue(processedInterim)
    getCalledVariable(processedInterim)
    createNewVariable(processedInterim)

    //also check if user is hovering over a block in viewer
    if (userSaidParam(interim)) {
        if(Blockly.selected){
            blockChosen = Blockly.selected;
        }
        waitingForParams = true;
        processed = true;
    } else if (userSaidRun(interim)) {
        if(control.blocks.length > 0){
            Code.runJS();
            generateSpeech("play!");
            playAudio();
            processed = true;
        }
    } else if (userSaidDelete(interim)){
        control.deleteBlock();
        processed = true;
    }else if(userSaidStopAudio(interim)){
        stopAudio();
        processed = true;
    }

    //setting parameters.
    if(waitingForParams && blockChosen != null){
        //get the parameters sequentially.
        if(processedInterim != ""){
            var grammar  = parameterGrammar[blockChosen.type]
            parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
            try {
                str = processedInterim;
                parser.feed(processedInterim);
                var result = parser.results[0];
                processParamsChosen(result, blockChosen);
                generateSpeech("changed!");
                //process ended
                processed = true;
                waitingForParams = false;
            } catch(parseError) {
                // console.log(
                //     "Error at character " + parseError.offset
                // ); // "Error at character 2"
            }
        }

    }



    //if end of process restart
    if(processed){
        recognition.stop();
        paused = true;
    }

}

recognition.onspeechend = function() {

    recognition.stop();
    paused = true;
}


/* helper functions for speech */

var userSaid = function(str, commands){
    commands = commands.split(" ");
    //all should be included
    for (var i = 0; i < commands.length; i++) {
        if (str.indexOf(commands[i]) < 0){
            return false;
        }
    }
    return true;
}

var userSaidParam = function(transcript){
    for (var i=0 ; i<candidateParam.length ; i++){
        var candidate = candidateParam[i];
        if(userSaid(transcript, candidate)){
            return true
        }
    }
    return false;
}



var userSaidRun = function(transcript){

    for (var i=0 ; i<candidatePlay.length ; i++){
        var candidate = candidatePlay[i];
        if(userSaid(transcript, candidate)){
            return true
        }
    }
    return false;
}



var userSaidDelete = function(transcript){
    for(var i=0; i<candidateDelete.length; i++){
        candidate = candidateDelete[i];
        if(userSaid(transcript, candidate)){
            return true
        }
    }
    return false;
}

var userSaidStopAudio = function(transcript){
    for(var i=0; i<candidateStop.length; i++){
        candidate = candidateStop[i];
        if(userSaid(transcript, candidate)){
            return true
        }
    }
    return false;
}



var processParamsChosen = function(parseResult, blockChosen){

    var parametersInfo = paramInfo;
    var paramsChosen = processResult(parseResult);
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
                }

            }
            blockChosen.setFieldValue(paramChosen , paramName);
        }
    }

}

var processInterim = function(transcript){
    var numbers = {0:["zero"], 1:["one", "on"], 2:["to", "two"], 3:["three"], 4:["for", "four"], 5:["five"],
        6:["six"], 7:["seven"], 8:["eight"], 9:["nine"], 10:["ten"]
    };
    Object.keys(numbers).forEach(function(num){
        var candidates = numbers[num];
        candidates.forEach(function(candidate){
            transcript = (transcript.trim()).replace(candidate, num.toString());
        })
    })

    //process canddiates for variables
    var variables = {'x':['EX', 'ex', 'Ex', 'eggs', 'at'], 'y':['Why', 'why'], 'get x':['jet X']};
    Object.keys(variables).forEach(function(variable){
        var candidates = variables[variable];
        candidates.forEach(function(candidate){
            transcript = (transcript.trim()).replace(candidate, variable);
        })
    })

    //check for color blue
    transcript = transcript.replace("blew", "blue");
    transcript = transcript.replace("equal zero", "equals 0")

    return transcript;
}


var processResult = function(result){
    var params = [];
    result.forEach(function(container){
        var splits = container[0];

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
};

var generateSpeech = function(message, callback) {
    if (voicesReady) {
        var msg = new SpeechSynthesisUtterance();
        msg.voice = window.speechSynthesis.getVoices()[2];
        msg.text = message;
        msg.rate = 0.2;
        if (typeof callback !== "undefined"){
            msg.onend = callback;
        }


        speechSynthesis.speak(msg);
    }
};


var playAudio = function() {
    var audio = document.getElementById("myAudio");
    audio.play();

}

var stopAudio = function(){
    var audio = document.getElementById("myAudio");
    audio.pause();
}




