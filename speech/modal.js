

$(document).ready(function(){
    $('body').on("click", "#speechModalButton",(function(){
        console.log("hoo button");
        showParameterModal();

    }));


});



var displayModal = function(){
    var modal = document.getElementById('saveModal');
    modal.style.display = "block";
}

var closeModal = function(){
    var modal = document.getElementById('saveModal');
    modal.style.display = "none";
}

//function for showing modal when user said "parameter"
var showParameterModal = function(blockSelected){
    if(blockSelected != null){
        $('#param-content').empty();
        var blockName = blockSelected.type;

        var blockStorage = JSON.parse(sessionStorage["paramInfo"]);
        var blockParameterInfo = blockStorage[blockName];
        var divString = "";
        console.log(blockName);
        console.log(blockStorage);
        console.log(blockParameterInfo);
        for(var i=0; i<Object.keys(blockParameterInfo).length; i++){
            var paramInfo = blockParameterInfo[i];
            var paramName = paramInfo["name"];
            console.log(paramName);
            divString += '<div><div id="wrapper-'+i + '">' + paramName + '</div>' + '<div id="val-'+i+'">'+'</div>';
        }

        console.log(divString);
        $('#param-content').append(divString);
        console.log("Modal show");
        displayModal();
    }
}



var deleteBlock = function(){
    if(blockChosen){
        blockChosen.dispose(false, true);
    }

}

