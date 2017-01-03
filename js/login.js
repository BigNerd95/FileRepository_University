// init function runned when page is loaded
document.observe("dom:loaded", function(){
    showLogin();
    bindEvents();
});

function login(){
    var userField = $('loginuser');
    var passField = $('loginpass');
    if (userField.value == "")
        userField.shake();
    if (passField.value == "")
        passField.shake();

    if (userField.value != "" && passField.value != ""){
        sendAjax(USER_FUNCTIONS+'login.php', checkLogin, {
            username: userField.value,
            password: passField.value
        });
    }
}

function checkLogin(result){
    if (result.error == 0)
        alert("ok");
    else
        alert("no");
}

function showLogin(){
    $('registerbtn').removeClassName('selected');
    $('register').hide();
    $('loginbtn').addClassName('selected');
    $('login').show();
}

function showRegister(){
    $('loginbtn').removeClassName('selected');
    $('login').hide();
    $('registerbtn').addClassName('selected');
    $('register').show();
}

// attach events callback to page elements
function bindEvents(){
    $('loginbtn').on('click', function(event, element){
        showLogin();
    });
    $('registerbtn').on('click', function(event, element){
        showRegister();
    });

    $('loginsbmt').on('click', function(event, element){
        login();
    });
}
