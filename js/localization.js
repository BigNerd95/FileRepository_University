// API error translation
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
    UPLOAD_FAILED: "Upload failed!",
    INVALID_DIRECTORY: "Invalid directory!",
    DB_ERROR: "Database error!",
    FILE_NOT_FOUND: "File not found!",
    INVALID_USERNAME: "Invalid username!",
    INVALID_PASSWORD: "Invalid password!"
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
    UPLOAD_FAILED: "Caricamento fallito!",
    INVALID_DIRECTORY: "Cartella non valida!",
    DB_ERROR: "Errore nel database!",
    FILE_NOT_FOUND: "File non trovato!",
    INVALID_USERNAME: "Nome utente non valido!",
    INVALID_PASSWORD: "Password non valida!"
}

// string translation
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
    TRANSFERS_FILE_TITLE: "Transfers",
    MIN_LENGTH: "Min length",
    MAX_LENGTH: "Max length",
    NEW_PASS_INVALID: "New password invalid!",
    NEW_PASS_DIFFERS: "Rewrite correctly the new password"
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
    TRANSFERS_FILE_TITLE: "Trasferimenti",
    MIN_LENGTH: "Lunghezza minima",
    MAX_LENGTH: "Lunghezza massima",
    NEW_PASS_INVALID: "Nuova password non valida!",
    NEW_PASS_DIFFERS: "Riscrivi correttamente la nuova password"
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

// default english language
window.error_strings = error_strings_en;
window.locale_strings = locale_strings_en;

// return string of the corresponding error
function getErrorString(error){
    var message = error_strings[error];
    if (message == undefined)
        return locale_strings['UNKNOWN_ERROR'];
    else
        return message;
}

// return the translated string
function getString(stringid){
    var string = locale_strings[stringid];
    if (string == undefined)
        return stringid;
    else
        return string;
}

// setup language translation on page init
function setLanguage(){
    var lanid = navigator.language.substring(0,2);
    var lan = languages[lanid];
    if (lan != undefined){
        window.error_strings = lan.error;
        window.locale_strings = lan.locale;
    }
}
