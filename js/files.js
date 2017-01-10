

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

    $('list_file').update(); // empty the list

    if (files.length > 0) {
        $('delete_file').show();
        info('info_file');

        var list = new Element('ul'); // create a new list
        $('list_file').insert(list); // show the list in the dom

        files.each(function(element, index, array){ // populate the new list
            var filename = element.escapeHTML();
            var item = new Element('li'); // create new item
            item.update(filename); // set item content
            item.title = "Double click to download";

            item.on('dblclick', function(event, element){
                console.log("double");
                downloadFile(element.innerHTML);
            });

            item.draggable = true;
            item.on('dragstart', function(event, element){
                event.dataTransfer.setData('filename', element.innerHTML.unescapeHTML());
                $('delete_file').addClassName('highlight');
            });
            item.on('dragend', function(event, element){
                $('delete_file').removeClassName('highlight');
            });

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

            list.insert(item); // add item to list
        });
    } else {
        $('delete_file').hide();
        $('list_file').insert(new Element('span').update("NO FILES"));
        info('info_file', 'Drag and drop new files on the arrow');
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
            info('info_file', locale_strings[result.error], 3);
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
