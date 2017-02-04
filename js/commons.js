
// get value from field, if value is empty the field is shaked
function getFormValue(id){
    var object = $(id);
    var value = object.getValue();
    if (value == ""){
        object.shake();
    }
    return value;
}

// check if a value is in a range
// optionally an element id and a message can be passed to alert the user
function isValueInRange(value, min, max, id_warning, inital_message){
    if (value.length < min || value.length > max) {
        if (id_warning && inital_message){
            info(id_warning, inital_message + '<br>' +
                getString('MIN_LENGTH') + ': ' + min + '<br>' +
                getString('MAX_LENGTH') + ': ' + max, 4);
        }
        return false;
    } else {
        return true;
    }
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
