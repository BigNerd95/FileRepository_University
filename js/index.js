// init function runned when page is loaded
document.observe("dom:loaded", function(){
    showFiles();
    bindEvents();
});

function logout(){
    sendAjax(USER_FUNCTIONS+'logout.php', function(result){
        console.log(result);
        if (result.error == CL_NO_ERROR){
            openLogin();
        } else {
            alert(result.error);
            //tempInfo(error_messages[result.error], 4);
        }
    });
}

function openLogin(){
    window.location.assign("login.php"); // index.html / index.php
}

function getFormValue(id){
    var object = $(id);
    var value = object.getValue();
    if (value == ""){
        object.shake();
    }
    return value;
}

function tempInfo(message, seconds){
    clearTimeout(window.info_timeout);
    info(message); // set message
    window.info_timeout = setTimeout(function(){
        info(); // hide message after sencods
    }, seconds*1000);
}

function info(message){
    $('sinfo').update(message);
    if (message)
        $('sinfo').show();
    else
        $('sinfo').hide();
}



/******************
* FILES FUNCTIONS *
******************/

function showFiles(){
    $('settings_btn').removeClassName('selected');
    $('settings').hide();

    $('files_btn').addClassName('selected');
    $('files').show();
}

function listFiles(){
    sendAjax(FILE_FUNCTIONS+'list.php', function(result) {
        console.log(result);
    });
}

function editFileName() {

}

function deleteFile(){

}

function downloadFile(){

}

function uploadFile(){

}

/*********************
* SETTINGS FUNCTIONS *
*********************/

function showSettings(){
    $('files_btn').removeClassName('selected');
    $('files').hide();

    $('settings_btn').addClassName('selected');
    $('settings').show();

    showChangePassword();
}

function resetSettingsForms(){
    $('delete_account').reset();
    $('change_password').reset();
}

function showChangePassword(){
    resetSettingsForms();

    $('delete_account_btn').removeClassName('selected');
    $('delete_account').hide();

    $('change_password_btn').addClassName('selected');
    $('change_password').show();
}

function showDeleteAccount(){
    resetSettingsForms();

    $('change_password_btn').removeClassName('selected');
    $('change_password').hide();

    $('delete_account_btn').addClassName('selected');
    $('delete_account').show();
}

function changePassword(){
    var password = getFormValue('cp_password');
    var newpassword = getFormValue('cp_new_password');
    var newpassword2 = getFormValue('cp_new_password_2');

    if (password && newpassword && newpassword2){
        if (newpassword == newpassword2){
            sendAjax(USER_FUNCTIONS+'edit.php', checkChangePassword, {
                password: password,
                action: 'editPassword',
                newPassword: newpassword
            });
        } else {
            $('cp_new_password_2').setValue("");
            $('cp_new_password_2').shake();
        }
    }
}

function checkChangePassword(result){
    switch (result.error){
        default:
            tempInfo(getErrorMessage(result.error), 4);
            $('change_password').reset();
            $('change_password').shake();
            break;

        case CL_NO_ERROR:
            tempInfo(locale_strings['PASSWORD_CHANGED'], 4);
            $('change_password').reset();
            break;

        case CL_NOT_LOGGEDIN:
            openLogin();
            break;

        case CL_WRONG_CREDENTIALS:
            tempInfo(getErrorMessage(result.error), 4);
            $('cp_password').setValue("");
            $('cp_password').shake();
            break;
    }
}

function deleteAccount(){
    var password = getFormValue('da_password');

    if (password){
        sendAjax(USER_FUNCTIONS+'edit.php', checkDeleteAccount, {
            password: password,
            action: 'deleteAccount'
        });
    }
}

function checkDeleteAccount(result){
    if (result.error == CL_NO_ERROR){
        openLogin();
    } else {
        tempInfo(error_messages[result.error], 4);
        $('da_password').setValue("");
        $('da_password').shake();
    }
}




// attach events callback to page elements
function bindEvents(){
    // Top barr buttons
    $('files_btn').on('click', function(event, element){
        showFiles();
    });
    $('settings_btn').on('click', function(event, element){
        showSettings();
    });
    $('logout_btn').on('click', function(event, element){
        logout();
    });


    //$('up').on('submit', function(event, element){
    $('select_file').on('change', function(event, element){
        event.stop();
        //console.log(event.target);
        //console.log(new FormData(event.target));

        var data = new FormData();
        data.append('file', element.files[0]);

        var ax = new XMLHttpRequest();
        ax.open("post", FILE_FUNCTIONS+'send.php');
        ax.onload=function(r){
            console.log(ax.responseText);
        }
        ax.send(data);
        return;

        /*
        //NON FUNZIONA CON PROTOTYPE
        new Ajax.Request(FILE_FUNCTIONS+'send.php', {
            method: "post",
            postBody: data,
            onSuccess: function(response) {
                console.log(LOG_DEBUG, response.responseText);
                //callback(response.responseJSON);
            },
            onFailure: ajaxFailure//,
            //onException: ajaxFailure
        });
        */
    });

    // Settings tab buttons
    $('change_password_btn').on('click', function(event, element){
        showChangePassword();
    });
    $('delete_account_btn').on('click', function(event, element){
        showDeleteAccount();
    });

    // Settings forms submissions
    $('change_password').on('submit', function(event, element){
        event.stop(); // prevent form submission
        changePassword();
    });
    $('delete_account').on('submit', function(event, element){
        event.stop(); // prevent form submission
        deleteAccount();
    });
}

// http://api.prototypejs.org/
