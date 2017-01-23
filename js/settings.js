
// Empty forms fields
function resetSettingsForms(){
    info('sinfo'); // reset info message
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
            sendAjax(USER_FUNCTIONS+'edit.php', changePasswordCallback, {
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
function changePasswordCallback(result){
    switch (result.error){
        // If no error, show feedback "password changed"
        case API_NO_ERROR:
            info('sinfo', locale_strings['PASSWORD_CHANGED'], 4);
            $('change_password').reset();
            break;

        // If not logged in, show login page
        case API_NOT_LOGGEDIN:
            openLogin();
            break;

        // Provided actual password was wrong
        case API_WRONG_CREDENTIALS:

            info('sinfo', getErrorString(result.error), 4);
            $('cp_password').setValue("");
            $('cp_password').shake();
            break;

        // Else show a info message
        default:
            info('sinfo', getErrorString(result.error), 4);
            $('change_password').reset();
            $('change_password').shake();
            break;
    }
}

// delete account handler
function deleteAccount(){
    // check if filed is compiled
    var password = getFormValue('da_password');

    if (password){
        // send ajax request to delete account
        sendAjax(USER_FUNCTIONS+'edit.php', deleteAccountCallback, {
            password: password,
            action: 'deleteAccount'
        });
    }
}

// delete account ajax callback
function deleteAccountCallback(result){
    switch (result.error){
        // If no error, show login page
        case API_NO_ERROR:
        // If not logged in, show login page
        case API_NOT_LOGGEDIN:
            openLogin();
            break;

        // Provided actual password was wrong
        case API_WRONG_CREDENTIALS:
            info('sinfo', getErrorString(result.error), 4);
            $('da_password').setValue("");
            $('da_password').shake();
            break;

        // Else show a info message
        default:
            info('sinfo', getErrorString(result.error), 4);
            $('delete_account').reset();
            $('delete_account').shake();
            break;
    }
}
