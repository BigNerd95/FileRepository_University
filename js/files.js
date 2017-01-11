
// Get file list from server
function listFiles(){
    // Sends an ajax request to the server API/files/list.php
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

// Populate files window with files list got from server
function listFilesFromArray(files){

    // Empty the list (remove both list and message in files list)
    $('list_file').update();

    // If there are files
    if (files.length > 0) {
        $('delete_file').show(); // show the trash icon
        info('info_file');       // Remove the info message

        var list = new Element('ul'); // create a new list
        $('list_file').insert(list);  // show the list in the dom

        files.each(function(element, index, array){ // Populate the new list
            var filename = element.escapeHTML();    // Escape file names to avoid xss
            var item = new Element('li');           // Create new list item
            item.update(filename);                  // Set item content
            item.title = "Double click to download";

            // Double click handler
            item.on('dblclick', function(event, element){
                console.log("double");
                downloadFile(element.innerHTML);
            });

            // Drag handler
            item.draggable = true;
            item.on('dragstart', function(event, element){
                event.dataTransfer.setData('filename', element.innerHTML.unescapeHTML()); // Recover original file name
                $('delete_file').addClassName('highlight');     // Highlight trash icon
            });
            item.on('dragend', function(event, element){
                $('delete_file').removeClassName('highlight');  // Remove highlight trash icon
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

            list.insert(item); // Add list item to list
        });
    } else {
    // If there are NO files
        $('delete_file').hide(); // Hide trash icon
        $('list_file').insert(new Element('span').update("NO FILES"));  // Show message in files list
        info('info_file', 'Drag and drop new files on the arrow');      // Show info message
    }
}

function editFileName() {

}

// File drop callback on trash icon
function deleteFile(filename){
    // Send an ajax request to API/files/edit.php
    sendAjax(FILE_FUNCTIONS+'edit.php', function(result){
        //console.log(result);
        // If there is no error, reload file list
        if (result.error == CL_NO_ERROR){
            listFiles();
        } else {
            //Else show a info message
            info('info_file', getErrorMessage(result.error), 3);
        }
    }, {
        action: 'delete', // The action is: delete (file)
        filename: filename // Filename to delete
    });
}

// Check if file exixsts and download that file
function downloadFile(filename){
    sendAjax(FILE_FUNCTIONS+'check.php', function(result){
        // If file exists download it
        if (result.error == CL_NO_ERROR){
            // Create a form to download the file
            var download = new Element('form', {
                method: 'post',
                action: FILE_FUNCTIONS+'get.php'
            });
            // Add the filename to the form
            var file_request = new Element('input', {
                type: 'hidden',
                name: 'filename',
                value: filename
            });
            download.insert(file_request);
            // Download the file
            download.submit();
        } else {
            //console.log(result.error);
            info('info_file', getErrorMessage(result.error), 3);
        }
    }, {
        filename: filename // Filename to check if exists
    });
}


function uploadFile(file){
    // Create form to send file content as POST body
    var data = new FormData();
    data.append('file', file);

    // Make an ajax request with browser primitive, with Prototype it is not working
    var req = new XMLHttpRequest();
    req.open("post", FILE_FUNCTIONS+'send.php');
    // On load callback
    req.onload = function(event){
        listFiles(); // Reload files list
        //console.log(req.responseText);
        /*
        AGGIUNGERE SWITCH ERRORE CON MESSAGGIO info
        */
    }

    /*req.onreadystatechange = function(event){
        console.log('change:', event);
    }*/
    req.upload.onprogress = function(a){
        console.log("progress: ", a);
    }

    req.send(data);

    /*
    // Prototype implementation not working
    new Ajax.Request(FILE_FUNCTIONS+'send.php', {
        method: "post",
        postBody: data,
        onSuccess: function(response) {
            console.log(LOG_DEBUG, response.responseText);
            //callback(response.responseJSON);
        },
        onFailure: ajaxFailure
    });
    */
}
