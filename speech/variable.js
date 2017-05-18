/**
 * Created by Jane on 5/12/2017.
 */
setVariable = function () {
    control.createVariable('x');

    var newBlockSvg = Blockly.mainWorkspace.toolbox_.flyout_.placeNewBlock_(Blockly.mainWorkspace.toolbox_.flyout_.currentBlocks[0]);
    control.currentBlock = new Block(newBlockSvg, cursorPosition);
    control.closeFlyout()
    control.currentBlock.blockSvg.select();
    control.currentBlock.blockSvg.moveBy(200, 10)
    control.blocks.push(control.currentBlock);
    control.currentBlock = null;


}

getVariable = function () {
    Blockly.mainWorkspace.toolbox_.tree_.getChildren()[7].select();
    var newBlockSvg = Blockly.mainWorkspace.toolbox_.flyout_.placeNewBlock_(Blockly.mainWorkspace.toolbox_.flyout_.currentBlocks[2]);
    control.currentBlock = new Block(newBlockSvg, cursorPosition);
    control.closeFlyout()
    control.currentBlock.blockSvg.select();
    control.currentBlock.blockSvg.moveBy(200, 10)
    control.blocks.push(control.currentBlock);
    control.currentBlock = null;
}


createVariable = function(variableName){
    Blockly.mainWorkspace.toolbox_.tree_.getChildren()[5].select();
    Blockly.mainWorkspace.createVariable(variableName)
}

initializeVariableList = function(){
    Blockly.mainWorkspace.variableList = ["foo"];
}


initializeToNumber = function(number, varBlock){
    number_xml = Blockly.mainWorkspace.toolbox_.tree_.getChildren()[3].blocks[0];
    numBlock = Blockly.Xml.domToBlock(Blockly.mainWorkspace, number_xml)
    numBlock.setFieldValue(number , "NUM");
    variableCon = varBlock.getConnections_(false)[2]
    numberCon = numBlock.getConnections_(false)[0]
    variableCon.connect(numberCon);
}

intializeVariableWithSpeech = function(){
    var setOfBlock = '<block type="variables_set" id="_ounmI1X*T@xPSs!?kwn"><field name="VAR">x</field><value name="VALUE"><block type="math_number" id="7^WuutlK,x^B/7s{up{b"><field name="NUM">0</field></block></value></block>'
}

makeVarBlock = function(varName, selectedBlock){
    selectedBlock.setFieldValue(varName , "VAR")
}