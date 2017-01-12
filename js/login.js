// init function runned when page is loaded
document.observe("dom:loaded", function(){
    setLanguage();
    initElements();
    showLogin();
});

function login(){
    var username = getFormValue('loginuser');
    var password = getFormValue('loginpass');

    if (username && password){
        sendAjax(USER_FUNCTIONS+'login.php', checkLogin, {
            username: username,
            password: password
        });
    }
}

function register(){
    var username = getFormValue('registeruser');
    var password = getFormValue('registerpass');
    var password2 = getFormValue('registerpass2');

    if ($('registeruser').hasClassName('errorField')){
        $('registeruser').shake();
        return;
    }

    if (username && password && password2){
        if (password == password2){
            sendAjax(USER_FUNCTIONS+'register.php', checkRegister, {
                username: username,
                password: password
            });
        } else {
            $('registerpass2').setValue("");
            $('registerpass2').shake();
        }
    }
}

function checkLogin(result){
    if (result == undefined) {
        info('cinfo', getString('SERVER_ERROR'));
        return;
    }
    switch (result.error){
        case API_NO_ERROR:
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

function checkRegister(result){
    if (result == undefined) {
        info('cinfo', getString('SERVER_ERROR'));
        return;
    }
    switch (result.error){
        case API_NO_ERROR:
            openIndex();
            break;
        default:
            info('cinfo', getErrorString(result.error), 3);
            $('register').reset();
            break;
    }
}

// check if inserted username is available
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

function openIndex(){
    window.location.assign("."); // index.html / index.php
}

function showLogin(){
    resetForms();
    $('registerbtn').removeClassName('selected');
    $('register').hide();
    $('loginbtn').addClassName('selected');
    $('login').show();
}

function showRegister(){
    resetForms();
    $('loginbtn').removeClassName('selected');
    $('login').hide();
    $('registerbtn').addClassName('selected');
    $('register').show();
}

function resetForms(){
    info('cinfo'); // reset info message
    $('register').reset();
    $('login').reset();
    $('registeruser').removeClassName('errorField');
}

function initLoginForm(){
    $('loginuser').placeholder = getString('USERNAME_FIELD');
    $('loginpass').placeholder = getString('PASSWORD_FIELD');
    $('loginsbmt').value = getString("LOGIN_BUTTON");
    $('loginbtn').update(getString("LOGIN_BUTTON"));
    // Tab button
    $('loginbtn').on('click', function(event, element){
        showLogin();
    });

    // Form submission
    $('login').on('submit', function(event, element){
        event.stop(); // prevent form submission
        login();
    });
}

function initRegisterForm(){
    $('registeruser').placeholder = getString('USERNAME_FIELD');
    $('registerpass').placeholder = getString('NEW_PASSWORD_FIELD');
    $('registerpass2').placeholder = getString('RETYPE_NEW_PASSWORD_FIELD');
    $('registersbmt').value = getString("REGISTER_BUTTON");
    $('registerbtn').update(getString("REGISTER_BUTTON"));
    // Tab button
    $('registerbtn').on('click', function(event, element){
        showRegister();
    });

    // Form submission
    $('register').on('submit', function(event, element){
        event.stop(); // prevent form submission
        register();
    });
    // Field event
    $('registeruser').on('keyup', function(event, element){
        availableUsername(element.getValue());
    });
}

// attach events callback to page elements
function initElements(){
    initLoginForm();
    initRegisterForm();
}

// http://api.prototypejs.org/dom/Form/
