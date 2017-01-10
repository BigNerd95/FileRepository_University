


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
            info('sinfo', getErrorMessage(result.error), 4);
            $('change_password').reset();
            $('change_password').shake();
            break;

        case CL_NO_ERROR:
            info('sinfo', locale_strings['PASSWORD_CHANGED'], 4);
            $('change_password').reset();
            break;

        case CL_NOT_LOGGEDIN:
            openLogin();
            break;

        case CL_WRONG_CREDENTIALS:
            info('sinfo', getErrorMessage(result.error), 4);
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
        info('sinfo', error_messages[result.error], 4);
        $('da_password').setValue("");
        $('da_password').shake();
    }
}
