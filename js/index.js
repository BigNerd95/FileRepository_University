
/*
TODO:
- cancel upload
- unificare funzioni check file php
- controllare lunghezza username e password sia su js che php e caratteri speciali
*/


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

// redirect user on login page
function openLogin(){
    window.location.assign("login.php"); // index.html / index.php
}

// Files button callback, show files window
function showFiles(){
    $('settings_btn').removeClassName('selected');
    $('settings').hide();
    $('files_btn').addClassName('selected');
    $('files').show();

    listFiles();
}

// Settings button callback, show settings window
function showSettings(){
    $('files_btn').removeClassName('selected');
    $('files').hide();

    $('settings_btn').addClassName('selected');
    $('settings').show();

    showChangePassword();
}

function initTitle(){
    sendAjax(USER_FUNCTIONS+'status.php', function(result){
        if (result == undefined){
            $('title').update(getString('WELCOME_TITLE'));
            return;
        }
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

// Init topbar buttons
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
    $('select_file').on('dragover', function(event, element){
        event.stop();
        if (!$('delete_file').hasClassName('highlight'))
            element.addClassName('highlight');
    });
    $('select_file').on('dragleave', function(event, element){
        event.stop();
        //element.style.color = "black";
        element.removeClassName('highlight');
    });
    $('select_file').on('drop', function(event, element){
        event.stop();
        //element.style.color = "black";
        element.removeClassName('upload');
        element.removeClassName('highlight');
        //console.log(event.dataTransfer.files);
        if (event.dataTransfer.files.length == 1){
            uploadFile(event.dataTransfer.files[0]);
        } else {
            element.shake();
        }
    });

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
    // DELETE FILES DRAG AND DROP
    $('delete_file').hide();
    $('delete_file').title = getString('DELETE_FILE_TITLE');
    $('delete_file').on('dragover', function(event, element){
        event.stop();
        // only color the trash in white if it is already open
        if (element.hasClassName('highlight'))
            element.addClassName('over');
    });
    $('delete_file').on('dragleave', function(event, element){
        event.stop();
        // remove the white on dragleave
        element.removeClassName('over');
    });
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

function initTransfers(){
    $('title_transfer').update(getString('TRANSFERS_FILE_TITLE'));
    transferShowHide();
}

function transferShowHide(){
    if ($$('#list_transfer li').length > 0){
        $('transfer_file').show();
    } else {
        $('transfer_file').hide();
    }
}

// Init settins buttons
function initSettings(){
    // Settings tab buttons

    // Set change password settings strings
    $('cp_password').placeholder = getString('PASSWORD_FIELD');
    $('cp_new_password').placeholder = getString('NEW_PASSWORD_FIELD');
    $('cp_new_password_2').placeholder = getString('RETYPE_NEW_PASSWORD_FIELD');
    $('cp_submit').value = getString('CHANGE_PASSWORD_BUTTON');
    $('change_password_btn').update(getString('CHANGE_PASSWORD_BUTTON'));
    $('change_password_btn').on('click', function(event, element){
        showChangePassword();
    });

    // Set delete account settings strings
    $('da_warning').update(getString('DELETE_ACCOUNT_WARNING'));
    $('da_password').placeholder = getString('PASSWORD_FIELD');
    $('da_submit').value = getString('DELETE_ACCOUNT_BUTTON');
    $('delete_account_btn').update(getString('DELETE_ACCOUNT_BUTTON'));
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
    document.on('dragover', function(event, element){
        event.stop(); // prevent document drop
        // hightlight upload arrow on file drag (only if it is as external file)
        if (!$('delete_file').hasClassName('highlight')){
            $('select_file').addClassName('upload');
        }
    });
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
