// global constants
var DEBUG = false;
var LOG_INFO  = '[INFO]:';
var LOG_DEBUG = '[DEBUG]:';

var USER_FUNCTIONS = 'API/user/';
var FILE_FUNCTIONS = 'API/file/';


// init function runned when page is loaded
document.observe("dom:loaded", function(){
    checkStatus();
    bindEvents();
    console.log(LOG_INFO, 'Init done');
});

function ajaxFailure(){
    console.log("Errore ajax");
}

function sendAjax(url, callback, params={}){
    new Ajax.Request(url, {
        method: "post",
        parameters: params,
        onSuccess: function(response) {
            console.log(LOG_DEBUG, response.responseJSON);
            callback(response.responseJSON);
        },
        onFailure: ajaxFailure,
        onException: ajaxFailure
    });
}

function checkStatus(){
    sendAjax(USER_FUNCTIONS+'status.php', showPage);
}

function showPage(result){
    if (result.error == 0){
        alert('logged in as: '+result.username);
    } else {
        alert("not logged in");
    }
}

// attach events callback to page elements
function bindEvents(){
    // puzzlearea's cell click events
    /*
    Event.on(document, 'click', '#puzzlearea > div', function(event, cell){
        if (cell.hasClassName(MOVABLE_CLASS_NAME)){
            // swap this cell with the empty cell
            moveCell(cell);
            winCheck();
        }
    });
    */


    $('login').on('click', function(event, element){
        console.log(LOG_INFO, 'click');
        sendAjax('API/user/login.php', alert, {username: "prova", password: "qwe"});
    });
    $('list').on('click', function(event, element){
        console.log(LOG_INFO, 'click');
        sendAjax('API/file/list.php', alert);
    });
}



/*

// override console.log to add logic
var original_console_log = console.log;
console.log = function(type, ...messages){
    if (type != LOG_DEBUG || DEBUG)
        original_console_log(type, messages.join(' '));
}

var MOVABLE_CLASS_NAME = 'movable';
var AREA_SIZES = {
    height: 400,
    width:  400,
    rows: 4,
    cols: 4
};

// global empty cell coords
var empty_cell_coords = null;

// set the background for each cell
function setImage(url) {
    $$('#puzzlearea > div').each(function(cell, index){
        var coords = indexToCoords(index);
        var pos = coordsToPos(coords);
        console.log(LOG_DEBUG, "Index:", index, "Coords:", coords.row, coords.col);
        setPos(cell, pos);
        cell.setStyle({
            //-1 because we need to move the background to the left and to the top
            'background-position': `${-pos.left}px ${-pos.top}px`,
            'background-image': `url(${url})`
        });
    });
}

// init empty cell coords assuming that it is the last cell of the puzzlearea
function initEmptyCellCoords(){
    var index = AREA_SIZES.rows * AREA_SIZES.cols - 1;
    var coords = indexToCoords(index);
    console.log(LOG_DEBUG, "Index:", index, "Coords:", coords.row, coords.col, "(Empty cell)");
    return coords;
}

// convert array index to cell coords
function indexToCoords(index){
    return {
        row: parseInt(index / AREA_SIZES.rows),
        col: index % AREA_SIZES.cols
    };
}

// convert cell coords to array index
function coordsToIndex(coords){
    return AREA_SIZES.cols * coords.row + coords.col;
}

// convert cell coords to cell position
function coordsToPos(coords){
    return {
        top:  coords.row * (AREA_SIZES.height / AREA_SIZES.rows),
        left: coords.col * (AREA_SIZES.width  / AREA_SIZES.cols)
    };
}

// convert cell position to cell coords
function posToCoords(pos){
    return {
        row: pos.top  / (AREA_SIZES.height / AREA_SIZES.rows),
        col: pos.left / (AREA_SIZES.width  / AREA_SIZES.cols)
    };
}

// get cell coords
function getCoords(cell){
    return posToCoords(getPos(cell));
}

// set cell coords
function setCoords(cell, coords){
    setPos(cell, coordsToPos(coords));
}

// get cell the position
function getPos(cell){
    return {
        top:  parseInt(cell.getStyle('top')),
        left: parseInt(cell.getStyle('left'))
    };
}

// set cell position
function setPos(cell, pos){
    cell.setStyle({
        'top':  `${pos.top}px`,
        'left': `${pos.left}px`
    });
}

// check if cell's coords are adjacent to empty cell
function isEmptyCellAdjacent(cell){
    var coords = getCoords(cell);
    return (
            (
                coords.row == empty_cell_coords.row &&
                Math.abs(coords.col - empty_cell_coords.col) == 1
            ) || (
                coords.col == empty_cell_coords.col &&
                Math.abs(coords.row - empty_cell_coords.row) == 1
            )
    );
}

// assign movable class to empty cell's adjacent
function makeCellsMovable(){
    $$('#puzzlearea > div').each(function(cell, index){
        if (isEmptyCellAdjacent(cell))
            cell.addClassName(MOVABLE_CLASS_NAME);
        else
            cell.removeClassName(MOVABLE_CLASS_NAME);
    });
}

// swap cell with empty cell and update empty cell's coords
function moveCell(cell){
    var coords = getCoords(cell);
    setCoords(cell, empty_cell_coords);
    empty_cell_coords = coords;
    console.log(LOG_DEBUG, "Empty cell coords:", empty_cell_coords.row, empty_cell_coords.col);
    makeCellsMovable();
}

// check if all cells are in the correct coords
function winCheck(){
    var won = true;
    $$('#puzzlearea > div').each(function(cell, index){
        // check if the current cell's index is the original cell's index
        if (coordsToIndex(getCoords(cell)) != index){
            won = false;
            throw $break; // breaks each loop
        }
    });
    if (won){
        // if the alert starts immediately, the cell's move effect is stopped
        setTimeout(function(){
            alert('Ehi guy! You rock!')
        }, 50);
    }
}

// generate a random integer number between min (included) and max (excluded)
function randomFromInterval(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// randomize puzzle's cells
function smashPuzzle(){
    var moves = randomFromInterval(100, 500);
    for (var i = 0; i<moves; i++){
        // only empty cell's adjacent can be moved
        var movable_cells = $$(`.${MOVABLE_CLASS_NAME}`);
        // select a random cell from empty cell's adjacent
        var cell = movable_cells[randomFromInterval(0, movable_cells.length)];
        moveCell(cell);
    }
    console.log(LOG_INFO, 'Moves:', moves);
}

*/
