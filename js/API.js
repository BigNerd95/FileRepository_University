
// API functions url
var USER_FUNCTIONS = 'API/user/';
var FILE_FUNCTIONS = 'API/file/';

// API general errors
const API_NO_ERROR = "NO_ERROR";
const API_DB_ERROR = "DB_ERROR";
const API_FAILED_ACTION = "FAILED_ACTION";
const API_UNKNOWN_ACTION = "UNKNOWN_ACTION";
const API_MISSING_PARAMETER = "MISSING_PARAMETER";

// API user errors
const API_NOT_LOGGEDIN = "NOT_LOGGEDIN";
const API_ALREADY_LOGGEDIN = "ALREADY_LOGGEDIN";
const API_WRONG_CREDENTIALS = "WRONG_CREDENTIALS";
const API_USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS";
const API_REGISTRATION_FAILED = "REGISTRATION_FAILED";
const API_INVALID_USERNAME = "INVALID_USERNAME";
const API_INVALID_PASSWORD = "INVALID_PASSWORD";

// API file errors
const API_UPLOAD_FAILED = "UPLOAD_FAILED";
const API_INVALID_DIRECTORY = "INVALID_DIRECTORY";
const API_FILE_NOT_FOUND = "FILE_NOT_FOUND";

// sends async request to the serve and calls the callback
function sendAjax(url, callback, params){
    if (params == undefined)
        params = {};
    new Ajax.Request(url, {
        method: "post",
        parameters: params,
        onSuccess: function(response) {
            console.log('AJAX response:', response.responseJSON);
            // if request success callback is called passing resposnse as parameter
            callback(response.responseJSON);
        },
        onFailure: function(){
            // if request fails callback is called without parameters
            callback();
        }
    });
}
