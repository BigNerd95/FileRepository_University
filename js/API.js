// global constants
var DEBUG = false;
var LOG_INFO  = '[INFO]:';
var LOG_DEBUG = '[DEBUG]:';

var USER_FUNCTIONS = 'API/user/';
var FILE_FUNCTIONS = 'API/file/';

const API_NO_ERROR = "NO_ERROR";
const API_NOT_LOGGEDIN = "NOT_LOGGEDIN";
const API_ALREADY_LOGGEDIN = "ALREADY_LOGGEDIN";
const API_MISSING_PARAMETER = "MISSING_PARAMETER";
const API_WRONG_CREDENTIALS = "WRONG_CREDENTIALS";
const API_USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS";
const API_REGISTRATION_FAILED = "REGISTRATION_FAILED";
const API_FAILED_ACTION = "FAILED_ACTION";
const API_UNKNOWN_ACTION = "UNKNOWN_ACTION";
const API_DB_ERROR = "DB_ERROR";

const error_strings_en = {
    ALREADY_LOGGEDIN: "You are already logged in!",
    NOT_LOGGEDIN: "You are not logged in!",
    NO_ERROR: "No error",
    MISSING_PARAMETER: "Missing parameter!",
    WRONG_CREDENTIALS: "Wrong credentials!",
    USER_ALREADY_EXISTS: "This username already exists!",
    REGISTRATION_FAILED: "Registration failed!",
    FAILED_ACTION: "Action failed!",
    UNKNOWN_ACTION: "Action unknown!",
    DB_ERROR: "Database error!"
}

const error_strings_it = {
    ALREADY_LOGGEDIN: "Sei già loggato!",
    NOT_LOGGEDIN: "Non sei loggato!",
    NO_ERROR: "Nessun errore",
    MISSING_PARAMETER: "Parametro mancante!",
    WRONG_CREDENTIALS: "Credenziali errate!",
    USER_ALREADY_EXISTS: "Questo utente è già registrato!",
    REGISTRATION_FAILED: "Registrazione fallita!",
    FAILED_ACTION: "Azione fallita!",
    UNKNOWN_ACTION: "Azione sconosciuta!",
    DB_ERROR: "Errore nel database!"
}


const locale_strings_en = {
    UNKNOWN_ERROR: "Unknown error",
    SERVER_ERROR: "Server error",
    PASSWORD_CHANGED: "Password changed!",
    NO_FILES: "No files",
    DRAG_FILES: "Drag and drop new files on the arrow",
    FILES_BUTTON: "Files",
    SETTINGS_BUTTON: "Settings",
    LOGOUT_BUTTON: "Logout",
    CHANGE_PASSWORD_BUTTON: "Change password",
    DELETE_ACCOUNT_BUTTON: "Delete account",
    USERNAME_FIELD: "Username",
    PASSWORD_FIELD: "Password",
    NEW_PASSWORD_FIELD: "New password",
    RETYPE_NEW_PASSWORD_FIELD: "Retype new password",
    DELETE_ACCOUNT_WARNING: "This action is irreversible!",
    DELETE_FILE_TITLE: "Drag and drop a file here to delete",
    SELECT_FILE_TITLE: "Drag and drop a new file here to upload",
    DOWNLOAD_FILE_TITLE: "Double click to download",
    LOGIN_BUTTON: "Login",
    REGISTER_BUTTON: "Register",
    WELCOME_TITLE: "Welcome",
    TRANSFERS_FILE_TITLE: "Transfers"
}

const locale_strings_it = {
    UNKNOWN_ERROR: "Errore sconosciuto",
    SERVER_ERROR: "Errore del server",
    PASSWORD_CHANGED: "Password cambiata!",
    NO_FILES: "Nessun file",
    DRAG_FILES: "Trascina nuovi file sulla freccia",
    FILES_BUTTON: "File",
    SETTINGS_BUTTON: "Impostazioni",
    LOGOUT_BUTTON: "Esci",
    CHANGE_PASSWORD_BUTTON: "Cambia password",
    DELETE_ACCOUNT_BUTTON: "Cancella account",
    USERNAME_FIELD: "Nome utente",
    PASSWORD_FIELD: "Password",
    NEW_PASSWORD_FIELD: "Nuova password",
    RETYPE_NEW_PASSWORD_FIELD: "Riscrivi la nuova password",
    DELETE_ACCOUNT_WARNING: "Questa azione è irreversibile!",
    DELETE_FILE_TITLE: "Trascina un file qui per eliminarlo",
    SELECT_FILE_TITLE: "Trascina un nuovo file qui per caricarlo",
    DOWNLOAD_FILE_TITLE: "Fai doppio click per scaricarlo",
    LOGIN_BUTTON: "Accedi",
    REGISTER_BUTTON: "Registrati",
    WELCOME_TITLE: "Benvenuto",
    TRANSFERS_FILE_TITLE: "Trasferimenti"
}

var languages = {
    'it': {
        error: error_strings_it,
        locale: locale_strings_it
    },
    'en': {
        error: error_strings_en,
        locale: locale_strings_en
    }
};

window.error_strings = error_strings_en;
window.locale_strings = locale_strings_en;

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
        onFailure: function(){
            callback();
        }
    });
}

function getErrorString(error){
    var message = error_strings[error];
    if (message == undefined)
        return locale_strings['UNKNOWN_ERROR'];
    else
        return message;
}

function getString(stringid){
    var string = locale_strings[stringid];
    if (string == undefined)
        return stringid;
    else
        return string;
}

function checkStatus(){
    sendAjax(USER_FUNCTIONS+'status.php', showPage);
}

function setLanguage(){
    var lanid = navigator.language.substring(0,2);
    var lan = languages[lanid];
    if (lan != undefined){
        window.error_strings = lan.error;
        window.locale_strings = lan.locale;
    }
}
