// global constants
var DEBUG = false;
var LOG_INFO  = '[INFO]:';
var LOG_DEBUG = '[DEBUG]:';

var USER_FUNCTIONS = 'API/user/';
var FILE_FUNCTIONS = 'API/file/';

/*
const CL_ALREADY_LOGGEDIN = -2;
const CL_NOT_LOGGEDIN = -1;

const CL_NO_ERROR = 0;

// API errors
const CL_MISSING_PARAMETER = 1;
const CL_WRONG_CREDENTIALS = 2;
const CL_USER_ALREADY_EXISTS = 3;
const CL_REGISTRATION_FAILED = 4;
const CL_FAILED_ACTION = 5;
const CL_UNKNOWN_ACTION = 6;
*/

const CL_NO_ERROR = "NO_ERROR";
const CL_NOT_LOGGEDIN = "NOT_LOGGEDIN";
const CL_ALREADY_LOGGEDIN = "ALREADY_LOGGEDIN";

const CL_MISSING_PARAMETER = "MISSING_PARAMETER";
const CL_WRONG_CREDENTIALS = "WRONG_CREDENTIALS";
const CL_USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS";
const CL_REGISTRATION_FAILED = "REGISTRATION_FAILED";
const CL_FAILED_ACTION = "FAILED_ACTION";
const CL_UNKNOWN_ACTION = "UNKNOWN_ACTION";

const error_messages_en = {
    ALREADY_LOGGEDIN: "You are already logged in!",
    NOT_LOGGEDIN: "You are not logged in!",
    NO_ERROR: "No error",
    MISSING_PARAMETER: "Missing parameter!",
    WRONG_CREDENTIALS: "Wrong credentials!",
    USER_ALREADY_EXISTS: "This username already exists!",
    REGISTRATION_FAILED: "Registration failed!",
    FAILED_ACTION: "Action failed!",
    UNKNOWN_ACTION: "Action unknown!"
}

const error_messages_it = {
    ALREADY_LOGGEDIN: "Sei già loggato!",
    NOT_LOGGEDIN: "Non sei loggato!",
    NO_ERROR: "Nessun errore",
    MISSING_PARAMETER: "Parametro mancante!",
    WRONG_CREDENTIALS: "Credenziali errate!",
    USER_ALREADY_EXISTS: "Questo utente è già registrato!",
    REGISTRATION_FAILED: "Registrazione fallita!",
    FAILED_ACTION: "Azione fallita!",
    UNKNOWN_ACTION: "Azione sconosciuta!"
}


const locale_strings_en = {
    UNKNOWN_ERROR: "Unknown error",
    PASSWORD_CHANGED: "Password changed!"
}

const locale_strings_it = {
    UNKNOWN_ERROR: "Errore sconosciuto",
    PASSWORD_CHANGED: "Password cambiata!"
}

error_messages = error_messages_en;
locale_strings = locale_strings_it;


// init function runned when page is loaded
/*
document.observe("dom:loaded", function(){
    checkStatus();
    bindEvents();
    console.log(LOG_INFO, 'Init done');
});
*/

function ajaxFailure(){
    console.log("Errore ajax");
}

function sendAjax(url, callback, params){
    if (params == undefined)
        params = {};
    new Ajax.Request(url, {
        method: "post",
        parameters: params,
        onSuccess: function(response) {
            console.log(LOG_DEBUG, response.responseJSON);
            callback(response.responseJSON);
        },
        onFailure: ajaxFailure//,
        //onException: ajaxFailure
    });
}

function getErrorMessage(error){
    var message = error_messages[error];
    if (message == undefined)
        return locale_strings['UNKNOWN_ERROR'];
    else
        return message;
}

function checkStatus(){
    sendAjax(USER_FUNCTIONS+'status.php', showPage);
}

function showPage(result){
    if (result.error == 0){
        alert('logged in as: '+result.username);
    } else {
        alert("not logged in");
    }
}
