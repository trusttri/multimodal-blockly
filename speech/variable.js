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
    number_xml = Blockly.mainWorkspace.toolbox_.tree_.getChildren()[3].blocks[0];
    numBlockSvg = Blockly.Xml.domToBlock(Blockly.mainWorkspace, number_xml)
    //numBlock = new Block(numBlockSvg)
    numBlockSvg.setFieldValue(number , "NUM");
    variableCon = varBlock.getConnections_(false)[2]
    numberCon = numBlockSvg.getConnections_(false)[0]
    variableCon.connect(numberCon);
    //control.blocks.push(numBlock);
}

intializeVariableWithSpeech = function(){

}

makeVarBlock = function(varName, selectedBlock){
    selectedBlock.setFieldValue(varName , "VAR")
}