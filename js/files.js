
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


    /*
    <li><span>file.txt</span><div class="meter"><span style="width: 25%"></span></div></li>
    */

    var item = new Element('li');
    var label = new Element('span');
    label.insert(file.name.escapeHTML());
    var progress = new Element('div', {
        'class': 'meter'
    });
    var bar = new Element('span');
    bar.setStyle({
        'width': '0%'
    });
    progress.insert(bar);
    item.insert(label);
    item.insert(progress);

    /*
    var cancel = new Element('div', {
        'class': 'cancel_upload'
    });
    cancel.on('click', function(event, element){
        req.abort();
        item.remove();
        transferShowHide();
    });
    */

    $('list_transfer').insert(item);
    transferShowHide();

    // On load callback
    req.onload = function(event){

        listFiles(); // Reload files list
        item.remove();
        transferShowHide();

        //console.log(req.responseText);
        /*
        AGGIUNGERE SWITCH ERRORE CON MESSAGGIO info
        */
    }

    //console.log(req);
    req.upload.onprogress = function(event){
        //console.log("progress: ", event);
        if (event.lengthComputable){
            var uploaded_percent = parseInt(event.loaded/event.total*100);
            bar.setStyle({
                'width': uploaded_percent+'%'
            });
        } else {
            bar.setStyle({
                'width': '50%'
            });
            // highlight progressbar while uploading if length is not computable
            if (bar.highlighted == undefined){
                bar.highlighted = 1;
                setTimeout(function(){
                    bar.highlighted = undefined;
                }, 2000);
                bar.highlight({duration: 2});
            }
        }
    }

    req.send(data);
}

function transferShowHide(){
    if ($$('#list_transfer li').length > 0){
        $('transfer_file').show();
    } else {
        $('transfer_file').hide();
    }
}
