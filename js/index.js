
// init function when page is loaded
document.observe("dom:loaded", function(){
    setLanguage();
    initElements();
    allowDrag();
    showFiles();
});

// attach events callback to page elements
function initElements(){
    initTitle();
    initTopBar();
    initSelectFile();
    initDeleteFile();
    initTransfers();
    initSettings();
}

// logout current user
function logout(){
    sendAjax(USER_FUNCTIONS+'logout.php', function(result){
        switch (result.error){
            // If there is no error, show login page
            case API_NO_ERROR:
            // If not logged in, show login page
            case API_NOT_LOGGEDIN:
            // In any other case, show login page
            default:
                openLogin();
                break;
        }
    });
}

// Files button callback, show files section
function showFiles(){
    // remove selected effect from settings button and hide settings section
    $('settings_btn').removeClassName('selected');
    $('settings').hide();
    // add selected effect to files button and show files section
    $('files_btn').addClassName('selected');
    $('files').show();

    // update user's file list
    listFiles();
}

// Settings button callback, show settings section
function showSettings(){
    // remove selected effect from files button and hide files section
    $('files_btn').removeClassName('selected');
    $('files').hide();
    // add selected effect to settings button and show settings section
    $('settings_btn').addClassName('selected');
    $('settings').show();

    // show change password section
    showChangePassword();
}

// set username on the page
function initTitle(){
    sendAjax(USER_FUNCTIONS+'status.php', function(result){
        // if ajax error
        if (result == undefined){
            $('title').update(getString('WELCOME_TITLE'));
            return;
        }
        // parse ajax response
        switch (result.error){
            // If no error, show welcome username
            case API_NO_ERROR:
                $('title').update(getString('WELCOME_TITLE')+' '+result.username.escapeHTML());
                break;

            // If not logged in, show login page
            case API_NOT_LOGGEDIN:
                openLogin();
                break;

            // Else show welcome only
            default:
                $('title').update(getString('WELCOME_TITLE'));
                break;
        }
    });
}

// Init topbar buttons with translation and callback
function initTopBar() {
    // Top bar buttons
    $('files_btn').update(getString('FILES_BUTTON'));
    $('files_btn').on('click', function(event, element){
        showFiles();
    });
    $('settings_btn').update(getString('SETTINGS_BUTTON'));
    $('settings_btn').on('click', function(event, element){
        showSettings();
    });
    $('logout_btn').update(getString('LOGOUT_BUTTON'));
    $('logout_btn').on('click', function(event, element){
        logout();
    });
}

// Init upload button
function initSelectFile(){
    $('select_file').title = getString('SELECT_FILE_TITLE');

    // hightlight select icon while a new file id dragged over
    $('select_file').on('dragover', function(event, element){
        event.stop(); // prevent default action
        if (!$('delete_file').hasClassName('highlight'))
            element.addClassName('highlight');
    });
    // remove hightlight when a new file is dragged away
    $('select_file').on('dragleave', function(event, element){
        event.stop(); // prevent default action
        element.removeClassName('highlight');
    });
    // upload new files when dropped
    $('select_file').on('drop', function(event, element){
        event.stop(); // prevent default action
        // remove all effects
        element.removeClassName('upload');
        element.removeClassName('highlight');

        if (event.dataTransfer.files.length > 0){
            for(var i=0; i<event.dataTransfer.files.length; i++){
                uploadFile(event.dataTransfer.files[i]);
            }
        } else {
            element.shake();
        }

    });
    // show select dialog when clicked
    $('select_file').on('click', function(event, element){
        var select = new Element('input', {type: 'file'});
        select.on('change', function(event, element){
            if (element.files.length == 1){
                uploadFile(element.files[0]);
            }
        });
        select.click();
    });
}

// Init delete button
function initDeleteFile() {
    $('delete_file').hide();
    $('delete_file').title = getString('DELETE_FILE_TITLE');
    // hightlight delete icon when an uploaded file is dragged over
    $('delete_file').on('dragover', function(event, element){
        event.stop(); // prevent default action
        // only color the trash in white if it is already open
        if (element.hasClassName('highlight'))
            element.addClassName('over');
    });
    // remove hightlight when an uploaded file is dragged away
    $('delete_file').on('dragleave', function(event, element){
        event.stop(); // prevent default action
        element.removeClassName('over');
    });
    // delete the uploaded file when dropped
    $('delete_file').on('drop', function(event, element){
        event.stop();
        // on drop remove all effects
        element.removeClassName('highlight');
        element.removeClassName('over');
        // get element filename
        var filename = event.dataTransfer.getData('filename');
        if (filename != ''){
            deleteFile(filename);
        } else {
            element.shake();
        }
    });
}

// init transefs section
function initTransfers(){
    $('title_transfer').update(getString('TRANSFERS_FILE_TITLE'));
    $('transfer_file').hide();
    transferShowHide();
}

// hide and show transfer section based on upload presence
function transferShowHide(){
    if ($$('#list_transfer li').length > 0){
        $('transfer_file').show();
        /*if (!$('transfer_file').visible()){
            //$('transfer_file').blindDown({duration: 0.5});
            $('transfer_file').appear({duration: 0.5});
        }*/
    } else {
        $('transfer_file').hide();
        /*if ($('transfer_file').visible()){
            //$('transfer_file').blindUp({duration: 0.5});
            $('transfer_file').fade({duration: 0.5});
        }*/
    }
}

// Init settings tab buttons
function initSettings(){

    // Set change password settings strings
    $('cp_password').placeholder = getString('PASSWORD_FIELD');
    $('cp_new_password').placeholder = getString('NEW_PASSWORD_FIELD');
    $('cp_new_password_2').placeholder = getString('RETYPE_NEW_PASSWORD_FIELD');
    $('cp_submit').value = getString('CHANGE_PASSWORD_BUTTON');
    $('change_password_btn').update(getString('CHANGE_PASSWORD_BUTTON'));
    // set change password button callback
    $('change_password_btn').on('click', function(event, element){
        showChangePassword();
    });

    // Set delete account settings strings
    $('da_warning').update(getString('DELETE_ACCOUNT_WARNING'));
    $('da_password').placeholder = getString('PASSWORD_FIELD');
    $('da_submit').value = getString('DELETE_ACCOUNT_BUTTON');
    $('delete_account_btn').update(getString('DELETE_ACCOUNT_BUTTON'));
    // set delete account button callback
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

// Allow drag and drop of files on the page from the desktop
function allowDrag(){
    // prevent the browser to load the file if dropped on the page
    document.on('dragover', function(event, element){
        event.stop(); // prevent document drop
        // hightlight upload arrow on file drag (only with new file)
        if (!$('delete_file').hasClassName('highlight')){
            $('select_file').addClassName('upload');
        }
    });
    // prevent the browser to load the file if dropped on the page
    document.on('drop', function(event, element){
        event.stop(); // prevent document drop
        // remove upload arrow hightlight
        $('select_file').removeClassName('upload');
    });
    document.on('dragleave', function(event, element){
        // remove upload arrow hightlight
        $('select_file').removeClassName('upload');
    });
}
