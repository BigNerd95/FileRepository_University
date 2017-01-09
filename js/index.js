
/*
TODO:
- upload progress (magari far apparire sotto la list view le progress bar)
- rename
- controllare i path dei nomi dei file passati (non devono contenere ../)
- controllare se os win o unix e invertire path slash
- unificare funzioni check file php
- aggiungere nome utente in alto nella pagina index
*/


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

    listFiles();
}

function listFiles(){
    sendAjax(FILE_FUNCTIONS+'list.php', function(result) {
        switch (result.error){
            default:
                console.log(getErrorMessage(result.error));
                break;

            case CL_NO_ERROR:
                listFilesFromArray(result.files);
                break;

            case CL_NOT_LOGGEDIN:
                openLogin();
                break;
        }
    });
}

function listFilesFromArray(files){
    //console.log(files);

    $('list_file').update(); // empty the list

    if (files.length > 0) {
        var list = new Element('ul'); // create a new list
        $('list_file').insert(list); // show the list in the dom
        files.each(function(element, index, array){ // populate the new list
            var item = new Element('li'); // create new item
            item.update(element); // set item content
            /*
            item.on('contextmenu', function(event, element){
                event.stop();
                console.log("as");
                console.log(event.isRightClick());
            });
            item.on('click', function(){
                console.log("single");
            });
            */
            item.on('dblclick', function(event, element){
                console.log("double");
                downloadFile(element.innerHTML);
            });

            item.draggable = true;
            item.on('dragstart', function(event, element){
                event.dataTransfer.setData('filename', element.innerHTML);
                event.asd = "xxx";
            });
            list.insert(item); // add item to list
        });
    } else {
        $('list_file').insert(new Element('span').update("NO FILES"));
    }
}

function editFileName() {

}

function deleteFile(filename){
    sendAjax(FILE_FUNCTIONS+'edit.php', function(result){
        console.log(result);
        if (result.error == CL_NO_ERROR){
            listFiles();
        } else {
            console.log(result.error);
            //tempInfo(error_messages[result.error], 4);
        }
    }, {
        action: 'delete',
        filename: filename
    });
}

function downloadFile(filename){
    sendAjax(FILE_FUNCTIONS+'check.php', function(result){
        if (result.error == CL_NO_ERROR){
            var download = new Element('form', {
                method: 'post',
                action: FILE_FUNCTIONS+'get.php'
            });
            var file_request = new Element('input', {
                type: 'hidden',
                name: 'filename',
                value: filename
            });
            download.insert(file_request);
            download.submit();
        } else {
            console.log(result.error);
        }
    }, {
        filename: filename
    });
    /*
    // FUNZIONA, guardare come creare un downaload da una var js
    new Ajax.Request(FILE_FUNCTIONS+'get.php', {
        parameters: {filename: filename},
        onSuccess: function(resp) {
            console.log(resp);
        }
    });
    */
}


function uploadFile(file){
    var data = new FormData();
    data.append('file', file);

    var req = new XMLHttpRequest();
    req.open("post", FILE_FUNCTIONS+'send.php');
    req.onload = function(event){
        //console.log(event.responseText);
        listFiles();
        //console.log(req.responseText);
    }

    /*req.onreadystatechange = function(event){
        console.log('change:', event);
    }
    req.onprogress = function(a){
        console.log("progress: ", a);
    }*/

    req.send(data);

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

    /*
    $('select_file').on('change', function(event, element){
        event.stop();
        if (element.value != ''){
            uploadFile(element.files[0]);
            element.setValue(''); // reset field's value
        }
    });*/
    $('select_file').on('dragover', function(event, element){
        event.stop();
        element.style.color = "white";
    });
    $('select_file').on('dragleave', function(event, element){
        event.stop();
        element.style.color = "black";
    });
    $('select_file').on('drop', function(event, element){
        event.stop();
        element.style.color = "black";
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

    // DELETE FILES DRAG AND DROP
    $('delete_file').on('dragover', function(event, element){
        event.stop();
        element.style.color = "white";
    });
    $('delete_file').on('dragleave', function(event, element){
        event.stop();
        element.style.color = "black";
    });
    $('delete_file').on('drop', function(event, element){
        event.stop();
        element.style.color = "black";
        var filename = event.dataTransfer.getData('filename');
        if (filename != ''){
            deleteFile(filename);
        } else {
            element.shake();
        }
    });

    // DISABLE DOCUMENT DROP
    document.on('dragover', function(event, element){
        if (element != $('select_file'))
            event.stop();
        //return false;
    });
    document.on('drop', function(event, element){ // drop
        if (element != $('select_file'))
            event.stop();
        //event.stop();
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
