/**
 * Created by Jane on 5/12/2017.
 */
setVariable = function (varName, cursorPosition) {
    control.createVariable(varName);

    var newBlockSvg = Blockly.mainWorkspace.toolbox_.flyout_.placeNewBlock_(Blockly.mainWorkspace.toolbox_.flyout_.currentBlocks[0]);
    control.currentBlock = new Block(newBlockSvg, cursorPosition);
    control.closeFlyout()
    control.currentBlock.blockSvg.select();
    control.blocks.push(control.currentBlock);

    var layoutOffset = [0, document.getElementById('tab_blocks').offsetHeight]
    var blockWidth = control.currentBlock.blockSvg.width;
    var blockHeight = control.currentBlock.blockSvg.height;
    var processedCursor = [cursorPosition[0] - layoutOffset[0] - blockWidth/2, cursorPosition[1] - layoutOffset[1] - blockHeight/2]
    if(control.currentBlock.dragStart){
        control.currentBlock.blockSvg.dragStartXY_ = control.currentBlock.blockSvg.getRelativeToSurfaceXY();
        control.currentBlock.dragStart = false;
    }
    var beforeRelativeX = control.currentBlock.blockSvg.getRelativeToSurfaceXY()['x'];
    var beforeRelativeY = control.currentBlock.blockSvg.getRelativeToSurfaceXY()['y'];

    var deltaX = processedCursor[0] - beforeRelativeX; //before it was this.cursorX
    var deltaY = processedCursor[1] - beforeRelativeY;
    //update new X, Y
    control.currentBlock.cursorX += deltaX;
    control.currentBlock.cursorY += deltaY;
    control.currentBlock.blockSvg.moveBy(deltaX, deltaY);
    control.currentBlock = null;


}

getVariable = function (varName, cursorPosition) {
    Blockly.mainWorkspace.toolbox_.tree_.getChildren()[4].select();
    var newBlockSvg = Blockly.mainWorkspace.toolbox_.flyout_.placeNewBlock_(Blockly.mainWorkspace.toolbox_.flyout_.currentBlocks[2]);
    control.currentBlock = new Block(newBlockSvg, cursorPosition);
    control.currentBlock.blockSvg.setFieldValue(varName , "VAR")
    control.closeFlyout()
    control.currentBlock.blockSvg.select();
    control.blocks.push(control.currentBlock);
    var layoutOffset = [0, document.getElementById('tab_blocks').offsetHeight]
    var blockWidth = control.currentBlock.blockSvg.width;
    var blockHeight = control.currentBlock.blockSvg.height;
    var processedCursor = [cursorPosition[0] - layoutOffset[0] - blockWidth/2, cursorPosition[1] - layoutOffset[1] - blockHeight/2]
    if(control.currentBlock.dragStart){
        control.currentBlock.blockSvg.dragStartXY_ = control.currentBlock.blockSvg.getRelativeToSurfaceXY();
        control.currentBlock.dragStart = false;
    }
    var beforeRelativeX = control.currentBlock.blockSvg.getRelativeToSurfaceXY()['x'];
    var beforeRelativeY = control.currentBlock.blockSvg.getRelativeToSurfaceXY()['y'];

    var deltaX = processedCursor[0] - beforeRelativeX; //before it was this.cursorX
    var deltaY = processedCursor[1] - beforeRelativeY;
    //update new X, Y
    control.currentBlock.cursorX += deltaX;
    control.currentBlock.cursorY += deltaY;
    control.currentBlock.blockSvg.moveBy(deltaX, deltaY);

    control.currentBlock = null;
}


createVariable = function(variableName){
    Blockly.mainWorkspace.toolbox_.tree_.getChildren()[4].select();
    Blockly.mainWorkspace.createVariable(variableName)
}

initializeVariableList = function(){
    Blockly.mainWorkspace.variableList = ["ID"];
}


initializeToNumber = function(number, varBlock){

    variableCon = varBlock.getConnections_(false)[2]
    if(variableCon.isConnected()){
        var numBlockSvg = varBlock.getConnections_(false)[2].targetConnection.sourceBlock_;
        numBlockSvg.setFieldValue(number , "NUM");
        console.log(numBlockSvg);
        console.log("already");
    }else{
        var number_xml = Blockly.mainWorkspace.toolbox_.tree_.getChildren()[3].blocks[0];
        var numBlockSvg = Blockly.Xml.domToBlock(Blockly.mainWorkspace, number_xml)
        //numBlock = new Block(numBlockSvg)
        numBlockSvg.setFieldValue(number , "NUM");
        var numberCon = numBlockSvg.getConnections_(false)[0]
        variableCon.connect(numberCon);

        var blockX = numBlockSvg.getRelativeToSurfaceXY()['x'];
        var blockY = numBlockSvg.getRelativeToSurfaceXY()['y'];
        var numBlock = new Block(numBlockSvg, [blockX, blockY]);
        control.blocks.push(numBlock);

    }


    //if already exists, change the value


    //control.blocks.push(numBlock);
}


makeVarBlock = function(varName, selectedBlock){
    selectedBlock.setFieldValue(varName , "VAR")
    Blockly.mainWorkspace.variableList.push(varName);
}



/*
 * Requires the user to first use gesture
 * "equals [3]", "is [3]"
 */
function setValue(processedInterim){
    var grammar = variableGrammar ["set_value"]
    parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
    try {
        console.log(processedInterim)
        str = processedInterim;
        parser.feed(processedInterim);
        var result = parser.results;
        console.log("set value")
        console.log(result);
        var value = processResult(result[0])[1]
        console.log("value: "+value)
        //assignValueToVariable(result);
        initializeToNumber(value, Blockly.selected)


        //process ended
        processed = true;
    } catch(parseError) {
        console.log(
            "Error at character " + parseError.offset
        ); // "Error at character 2"
    }
}



/*
 * Requires the user to first use gesture
 * "variable [y]"
 */
function createNewVariable(processedInterim){
    var grammar = variableGrammar ["create_variable"]
    parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
    try {
        console.log(processedInterim)
        str = processedInterim;
        parser.feed(processedInterim);
        var result = parser.results[0];
        console.log("create neew");
        console.log(result);
        var name =  processResult(result)[1];
        if(Blockly.mainWorkspace.variableList.indexOf(name) < 0){
            makeVarBlock(name, Blockly.selected);
            processed = true;
        }

    } catch(parseError) {
        console.log(
            "Error at character " + parseError.offset
        ); // "Error at character 2"
    }
}

/*
 * "get [x]"
 *
 */
function getCalledVariable(processedInterim){
    var grammar = variableGrammar ["get_variable"]
    parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
    try {
        console.log(processedInterim)
        str = processedInterim;
        parser.feed(processedInterim);
        var result = parser.results[0];
        console.log("get varr")
        console.log(result);
        var value = processResult(result)[1]
        if(Blockly.mainWorkspace.variableList.indexOf(value) > -1){
            getVariable(value, cursorPosition)
            //assignValueToVariable(value);
            processed = true;
        }


    } catch(parseError) {
        console.log(
            "Error at character " + parseError.offset
        ); // "Error at character 2"
    }
}
