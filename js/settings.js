
// Empty forms fields
function resetSettingsForms(){
    $('delete_account').reset();
    $('change_password').reset();
}

// Show change password view
function showChangePassword(){
    resetSettingsForms();

    $('delete_account_btn').removeClassName('selected'); // remove clicked effect from delete account button
    $('delete_account').hide();                          // hide delete account view

    $('change_password_btn').addClassName('selected');   // add clicked effect to change password button
    $('change_password').show();                         // show change password view
}

// show delete account view
function showDeleteAccount(){
    resetSettingsForms();

    $('change_password_btn').removeClassName('selected'); // remove clicked effect from change password button
    $('change_password').hide();                          // hide change password view

    $('delete_account_btn').addClassName('selected');     // add clicked effect to delete account button
    $('delete_account').show();                           // show delete account view
}

// change password handler
function changePassword(){
    // check if all fields are compiled
    var password = getFormValue('cp_password');
    var newpassword = getFormValue('cp_new_password');
    var newpassword2 = getFormValue('cp_new_password_2');

    if (password && newpassword && newpassword2){
        if (newpassword == newpassword2){
            // send ajax request to change password
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

// change password ajax callback
function checkChangePassword(result){
    switch (result.error){
        default:
            // show any other error message
            info('sinfo', getErrorMessage(result.error), 4);
            $('change_password').reset();
            $('change_password').shake();
            break;

        case CL_NO_ERROR:
            // feedback: password has changed
            info('sinfo', locale_strings['PASSWORD_CHANGED'], 4);
            $('change_password').reset();
            break;

        case CL_NOT_LOGGEDIN:
            openLogin();
            break;

        case CL_WRONG_CREDENTIALS:
            // provided actual password was wrong
            info('sinfo', getErrorMessage(result.error), 4);
            $('cp_password').setValue("");
            $('cp_password').shake();
            break;
    }
}

// delete account handler
function deleteAccount(){
    // check if filed is compiled
    var password = getFormValue('da_password');

    if (password){
        // send ajax request to delete account
        sendAjax(USER_FUNCTIONS+'edit.php', checkDeleteAccount, {
            password: password,
            action: 'deleteAccount'
        });
    }
}

// delete account ajax callback
function checkDeleteAccount(result){
    if (result.error == CL_NO_ERROR){
        // account was deleted, load login page
        openLogin();
    } else {
        // show any other error message
        info('sinfo', error_messages[result.error], 4);
        $('da_password').setValue("");
        $('da_password').shake();
    }
}
