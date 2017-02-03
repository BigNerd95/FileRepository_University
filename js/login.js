// init function runned when page is loaded
document.observe("dom:loaded", function(){
    setLanguage();
    initElements();
    showLogin();
});

// attach events callback to page elements
function initElements(){
    initLoginForm();
    initRegisterForm();
}

// check login fields and send ajax request
function login(){
    var username = getFormValue('loginuser');
    var password = getFormValue('loginpass');

    if (username && password){
        sendAjax(USER_FUNCTIONS+'login.php', loginCallback, {
            username: username,
            password: password
        });
    }
}

// check register fields and send ajax request
function register(){
    var username = getFormValue('registeruser');
    var password = getFormValue('registerpass');
    var password2 = getFormValue('registerpass2');

    // If the username is not available shake username field
    if ($('registeruser').hasClassName('errorField')){
        $('registeruser').shake();
        return;
    }

    if (username && password && password2){
        // check user length
        if ( !isValueInRange(username, 4, 20, 'cinfo', getErrorString('INVALID_USERNAME')) ){
            $('registeruser').shake();
            return;
        }

        // check new password length
        if ( !isValueInRange(password, 8, 20, 'cinfo', getString('NEW_PASS_INVALID')) ){
            $('registerpass').setValue("");
            $('registerpass').shake();
            $('registerpass2').setValue("");
            $('registerpass2').shake();
            return;
        }

        // if new passwords are equals send the register request
        if (password == password2){
            sendAjax(USER_FUNCTIONS+'register.php', registerCallback, {
                username: username,
                password: password
            });
        } else {
            // show error message
            info('cinfo', getString('NEW_PASS_DIFFERS') , 4);
            $('registerpass2').setValue("");
            $('registerpass2').shake();
        }
    }
}

// login callback, if success the user is redirected to his profile
function loginCallback(result){
    // on ajax error
    if (result == undefined) {
        info('cinfo', getString('SERVER_ERROR'));
        return;
    }
    switch (result.error){
        case API_NO_ERROR:
            // login successful
            openIndex();
            break;
        case API_WRONG_CREDENTIALS:
            info('cinfo', getErrorString(result.error), 3);
            $('loginpass').setValue("");
            $('loginpass').shake();
            break;
        default:
            info('cinfo', getErrorString(result.error), 3);
            break;
    }
}

// register callback, if success the user is redirected to his profile
function registerCallback(result){
    // on ajax error
    if (result == undefined) {
        info('cinfo', getString('SERVER_ERROR'));
        return;
    }
    switch (result.error){
        // registration successful
        case API_NO_ERROR:
            openIndex();
            break;
        // submitted password is invalid
        case API_INVALID_PASSWORD:
            $('registerpass').setValue("");
            $('registerpass').shake();
            $('registerpass2').setValue("");
            $('registerpass2').shake();
            info('cinfo', getErrorString(result.error) + '<br>' +
                getString('MIN_LENGTH') + ': ' + result.min + '<br>' +
                getString('MAX_LENGTH') + ': ' + result.max, 4);
            break;
        // submitted username is invalid
        case API_INVALID_USERNAME:
            $('registeruser').shake();
            info('cinfo', getErrorString(result.error) + '<br>' +
                getString('MIN_LENGTH') + ': ' + result.min + '<br>' +
                getString('MAX_LENGTH') + ': ' + result.max, 4);
            break;
        default:
            info('cinfo', getErrorString(result.error), 3);
            $('register').reset();
            break;
    }
}

// check if typed username is available
function availableUsername(username){
    sendAjax(USER_FUNCTIONS+'available.php',
        // anonymous callback
        function(result){
            if (result == undefined){
                $('registeruser').removeClassName('errorField');
                return;
            }
            if (result.error == API_USER_ALREADY_EXISTS){
                $('registeruser').addClassName('errorField');
                info('cinfo', getErrorString(result.error));
            } else {
                $('registeruser').removeClassName('errorField');
                info('cinfo');
            }
        },
        // ajax request parameters
        {
            username: username
        }
    );
}

// show login section (form)
function showLogin(){
    resetForms(); // empty forms values
    // remove selected effect from register button and hide register section
    $('registerbtn').removeClassName('selected');
    $('register').hide();
    // add selected effect to login button and show login section
    $('loginbtn').addClassName('selected');
    $('login').show();
}

// show register section (form)
function showRegister(){
    resetForms(); // empty forms values
    // remove selected effect from login button and hide login section
    $('loginbtn').removeClassName('selected');
    $('login').hide();
    // add selected effect to register button and show register section
    $('registerbtn').addClassName('selected');
    $('register').show();
}

// reset login and register section (form)
function resetForms(){
    info('cinfo'); // empty info message field
    $('register').reset(); // resets register form
    $('login').reset(); // reset login form
    $('registeruser').removeClassName('errorField'); // remove error warning on username (register) field
}

// init login section
function initLoginForm(){
    // set translation on buttons and form fields
    $('loginuser').placeholder = getString('USERNAME_FIELD');
    $('loginpass').placeholder = getString('PASSWORD_FIELD');
    $('loginsbmt').value = getString("LOGIN_BUTTON");
    $('loginbtn').update(getString("LOGIN_BUTTON"));
    // Tab button callback
    $('loginbtn').on('click', function(event, element){
        showLogin();
    });

    // Form submission
    $('login').on('submit', function(event, element){
        event.stop(); // prevent form submission
        login(); // makes login
    });
}

// init register section
function initRegisterForm(){
    // set translation on buttons and form fields
    $('registeruser').placeholder = getString('USERNAME_FIELD');
    $('registerpass').placeholder = getString('NEW_PASSWORD_FIELD');
    $('registerpass2').placeholder = getString('RETYPE_NEW_PASSWORD_FIELD');
    $('registersbmt').value = getString("REGISTER_BUTTON");
    $('registerbtn').update(getString("REGISTER_BUTTON"));
    // Tab button callback
    $('registerbtn').on('click', function(event, element){
        showRegister();
    });

    // Form submission
    $('register').on('submit', function(event, element){
        event.stop(); // prevent form submission
        register(); // makes registration
    });
    // username availability check on key up
    $('registeruser').on('keyup', function(event, element){
        availableUsername(element.getValue());
    });
}
