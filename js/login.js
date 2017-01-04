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

function availableUsername(username){
    sendAjax(USER_FUNCTIONS+'available.php', checkUsername, {
        username: username
    });
}

function checkUsername(result){
    if (result.error == CL_USER_ALREADY_EXISTS){
        $('registeruser').addClassName('errorField');
    } else {
        $('registeruser').removeClassName('errorField');
    }
}

function getFormValue(id){
    var object = $(id);
    var value = object.getValue();
    if (value == ""){
        object.shake();
    }
    return value;
}

function checkLogin(result){
    console.log(result);
    if (result.error == 0)
        openIndex();
    else
        alert("no");
}

function checkRegister(result){
    console.log(result);
    if (result.error == 0)
        openIndex();
    else
        alert("no");
}

function openIndex(){
    window.location.assign(".");
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

    $('login').on('submit', function(event, element){
        event.stop(); // prevent form submission
        //console.log(element);
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
