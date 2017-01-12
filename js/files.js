
// Get file list from server
function listFiles(){
    // Sends an ajax request to the server API/files/list.php
    sendAjax(FILE_FUNCTIONS+'list.php', function(result) {
        if (result == undefined) {
            info('info_file', getString('SERVER_ERROR'));
            return;
        }

        switch (result.error){
            // If no error, show files list
            case API_NO_ERROR:
                listFilesFromArray(result.files);
                break;

            // If not logged in, show login page
            case API_NOT_LOGGEDIN:
                openLogin();
                break;

            // Else show a info message
            default:
                info('info_file', getErrorString(result.error), 3);
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
            item.title = getString('DOWNLOAD_FILE_TITLE');

            // Double click handler
            item.on('dblclick', function(event, element){
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
        $('list_file').insert(new Element('span').update(getString('NO_FILES')));  // Show message in files list
        info('info_file', getString('DRAG_FILES'));      // Show info message
    }
}

// File drop callback on trash icon
function deleteFile(filename){
    // Send an ajax request to API/files/edit.php
    sendAjax(FILE_FUNCTIONS+'edit.php', function(result){
        if (result == undefined) {
            info('info_file', getString('SERVER_ERROR'));
            return;
        }
        switch (result.error){
            // If there is no error, reload file list
            case API_NO_ERROR:
                listFiles();
                break;

            // If not logged in, show login page
            case API_NOT_LOGGEDIN:
                openLogin();
                break;

            //Else show a info message
            default:
                info('info_file', getErrorString(result.error), 3);
                break;
        }
    }, {
        action: 'delete', // The action is: delete (file)
        filename: filename // Filename to delete
    });
}

// Check if file exixsts and download it
function downloadFile(filename){
    sendAjax(FILE_FUNCTIONS+'check.php', function(result){
        if (result == undefined) {
            info('info_file', getString('SERVER_ERROR'));
            return;
        }
        switch (result.error){
            // If there is no error, get file
            case API_NO_ERROR:
                getFile(filename);
                break;

            // If not logged in, show login page
            case API_NOT_LOGGEDIN:
                openLogin();
                break;

            //Else show a info message
            default:
                info('info_file', getErrorString(result.error), 3);
                break;
        }
    }, {
        filename: filename // Filename to check if exists
    });
}

// Make native browser download
function getFile(filename){
    // Create a form to download the file
    var download = new Element('form', {
        method: 'post',
        action: FILE_FUNCTIONS+'get.php'
    });
    // Add the filename field to the form
    var file_request = new Element('input', {
        type: 'hidden',
        name: 'filename',
        value: filename
    });
    download.insert(file_request);
    // Download the file
    download.submit();
}

// Upload a new file to the server with ajax
function uploadFile(file){
    // Create form to send file content as POST body
    var data = new FormData();
    data.append('file', file);

    // Make an ajax request with browser primitive function, with Prototype it is not working
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

    // RANDOM STRING: (new Date().getTime()).toString(36)

    /*req.onreadystatechange = function(event){
        console.log('change:', event);
    }*/
    console.log(req);
    req.upload.onprogress = function(event){
        console.log("progress: ", event);
        if (event.lengthComputable){
            $('test_progress').max=event.total;
            $('test_progress').value=event.loaded;
        }
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
