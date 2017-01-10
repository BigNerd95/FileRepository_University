function getFormValue(id){
    var object = $(id);
    var value = object.getValue();
    if (value == ""){
        object.shake();
    }
    return value;
}

function info(id, message, seconds){
    clearTimeout(window["timeout_"+id]);
    $(id).update(message);
    if (message)
        $(id).show();
    else
        $(id).hide();
    if (seconds) {
        window["timeout_"+id] = setTimeout(function(){
            info(id); // hide message after sencods
        }, seconds*1000);
    }
}
