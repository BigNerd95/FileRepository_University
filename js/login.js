// init function runned when page is loaded
document.observe("dom:loaded", function(){
    showLogin();
    bindEvents();
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
    //console.log(result);
    switch (result.error){
        case CL_NO_ERROR:
            openIndex();
            break;
        case CL_WRONG_CREDENTIALS:
            info('cinfo', error_messages[result.error], 3);
            $('loginpass').setValue("");
            $('loginpass').shake();
            break;
        default:
            info('cinfo', error_messages[result.error], 3);
            break;
    }
}

function checkRegister(result){
    //console.log(result);
    if (result.error == CL_NO_ERROR){
        openIndex();
    } else {
        info('cinfo', error_messages[result.error], 3);
        $('register').reset();
    }
}

// check if inserted username is available
function availableUsername(username){
    sendAjax(USER_FUNCTIONS+'available.php',
        // anonymous callback
        function(result){
            if (result.error == CL_USER_ALREADY_EXISTS){
                $('registeruser').addClassName('errorField');
                info('cinfo', error_messages[result.error]);
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
    info('cinfo');
    $('register').reset();
    $('login').reset();
    $('registeruser').removeClassName('errorField');
}

// attach events callback to page elements
function bindEvents(){
    // Tab buttons
    $('loginbtn').on('click', function(event, element){
        showLogin();
    });
    $('registerbtn').on('click', function(event, element){
        showRegister();
    });

    // Forms submissions
    $('login').on('submit', function(event, element){
        event.stop(); // prevent form submission
        login();
    });
    $('register').on('submit', function(event, element){
        event.stop(); // prevent form submission
        register();
    });

    // Fields events
    $('registeruser').on('keyup', function(event, element){
        availableUsername(element.getValue());
    });
}

// http://api.prototypejs.org/dom/Form/
