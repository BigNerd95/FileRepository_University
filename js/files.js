
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

    // If there are files show them
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
                downloadFile(element.innerHTML.unescapeHTML()); // download file on double click
            });

            // Drag handler (to delete file)
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
    // If there are NO files show info message
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


    // create the new upload progress bar for this file
    var item = new Element('li');
    var label = new Element('div', {
        'class': 'name'
    });
    var labeltext = new Element('span');
    labeltext.update(file.name.escapeHTML()); // set the file name
    label.insert(labeltext);
    var progress = new Element('div', {
        'class': 'meter'
    });
    // init the progress bar
    var bar = new Element('span');
    bar.setStyle({
        'width': '0%'
    });
    progress.insert(bar);

    // create the cancel button
    var button = new Element('div', {
        'class': 'button_upload'
    });
    button.addClassName('cancel_upload');
    button.on('click', function(event, element){
        if (element.hasClassName('cancel_upload')){
            req.abort();
            item.remove();
            transferShowHide();
        }
    });

    // insert new upload item in transfer list
    item.insert(label);
    item.insert(progress);
    item.insert(button);
    $('list_transfer').insert(item);
    transferShowHide(); // check if transfer list must be displayed

    // upload end callback, set the result on the button
    item.removeItem = function(result){
        button.removeClassName('cancel_upload');
        button.addClassName(result);
        setTimeout(function(){
            item.remove();
            transferShowHide();
        }, 3000);
    }

    // On load callback
    req.onload = function(event){

        var response = JSON.parse(req.responseText);

        if (response.error == API_NO_ERROR){
            listFiles(); // Reload files list
            item.removeItem('success_upload');
        } else {
            item.removeItem('error_upload');
        }

        //console.log(JSON.parse(req.responseText));
    }

    req.onerror = function(event){
        item.removeItem('error_upload');
    }

    //console.log(req);
    req.upload.onprogress = function(event){
        //console.log("progress: ", event);
        transferShowHide();
        if (event.lengthComputable){
            // if length is computable, update the percent of the eprogress bar
            var uploaded_percent = parseInt(event.loaded/event.total*100);
            bar.setStyle({
                'width': uploaded_percent+'%'
            });
        } else {
            // if length is not computable, set the progress bar at 50% and start blinking it
            bar.setStyle({
                'width': '50%'
            });
            // blink progressbar while uploading if length is not computable
            if (bar.highlighted == undefined){
                bar.highlighted = 1;
                setTimeout(function(){
                    bar.highlighted = undefined;
                }, 2000);
                bar.highlight({duration: 2});
            }
        }
    }

    // send the ajax request
    req.send(data);
}
