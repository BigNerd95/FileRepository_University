
/*
TODO:
- upload progress (magari far apparire sotto la list view le progress bar)
- rename
- controllare i path dei nomi dei file passati (non devono contenere ../)
- controllare se os win o unix e invertire path slash
- unificare funzioni check file php
- aggiungere nome utente in alto nella pagina index
- controllare lunghezza username e password sia su js che php
*/


// init function when page is loaded
document.observe("dom:loaded", function(){
    showFiles();
    initElements();
    allowDrag();
});

// attach events callback to page elements
function initElements(){
    initTopBar();
    initSelectFile();
    initDeleteFile();
    initSettings();
}

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

// Init topbar buttons
function initTopBar() {
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
}

// Init upload button
function initSelectFile(){
    $('select_file').on('dragover', function(event, element){
        event.stop();
        //element.style.color = "white";
        //if(element.hasClassName('strips'))
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

// Init settins buttons
function initSettings(){
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
