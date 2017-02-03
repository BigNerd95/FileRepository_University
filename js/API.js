// global constants
var DEBUG = false;
var LOG_INFO  = '[INFO]:';
var LOG_DEBUG = '[DEBUG]:';

// API functions url
var USER_FUNCTIONS = 'API/user/';
var FILE_FUNCTIONS = 'API/file/';

// API error list
const API_NO_ERROR = "NO_ERROR";
const API_NOT_LOGGEDIN = "NOT_LOGGEDIN";
const API_ALREADY_LOGGEDIN = "ALREADY_LOGGEDIN";

const API_MISSING_PARAMETER = "MISSING_PARAMETER";
const API_WRONG_CREDENTIALS = "WRONG_CREDENTIALS";
const API_USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS";
const API_REGISTRATION_FAILED = "REGISTRATION_FAILED";
const API_FAILED_ACTION = "FAILED_ACTION";
const API_UNKNOWN_ACTION = "UNKNOWN_ACTION";
const API_UPLOAD_FAILED = "UPLOAD_FAILED";
const API_INVALID_DIRECTORY = "INVALID_DIRECTORY";
const API_DB_ERROR = "DB_ERROR";
const API_FILE_NOT_FOUND = "FILE_NOT_FOUND";
const API_INVALID_USERNAME = "INVALID_USERNAME";
const API_INVALID_PASSWORD = "INVALID_PASSWORD";

// sends async request to the serve and calls the callback
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
