
// get value from field, if value is empty the field is shaked
function getFormValue(id){
    var object = $(id);
    var value = object.getValue();
    if (value == ""){
        object.shake();
    }
    return value;
}

// set info message on an element and remove it after specified seconds,
// if seconds is udefined, the message will be permament
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

// redirect user on login page
function openLogin(){
    window.location.assign("login.php");
}

// show user profile
function openIndex(){
    window.location.assign("."); // index.html / index.php
}

// http://api.prototypejs.org/dom/Form/
