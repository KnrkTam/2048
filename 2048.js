let board;
let score = 0;
let rows = 4;
let columns = 4;

window.onload = function() {
    setGame();
    let restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener("click", (e)=> {
        restart();
    })
}

function setGame() {
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ];

    score = 0;

    // board = [
    //     [2,2,2,2],
    //     [2,2,2,2],
    //     [4,4,8,8],
    //     [4,4,8,8],
    // ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}


function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; // Clear the class 
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}



document.addEventListener("keyup", (e)=> {
    // Press one at a time
    switch (e.code) {
        case ("ArrowLeft"):
            slideLeft();
            setTwo();
            setTwo();

            break;
        case ("ArrowRight"):
            slideRight();
            setTwo();
            setTwo();

            break;
        case ("ArrowUp"):
            slideUp();
            setTwo();
            setTwo();


            break;
        case ("ArrowDown"):
            slideDown();
            setTwo();
            setTwo();

            break;
    }

    document.getElementById("score").innerHTML = score

}) 

function filterZero (row) {
    return row.filter(num => num != 0); // create new array without zero
}
function slide(row) {
    // Get rid of zeros
    row = filterZero(row);

    //Slide
    for (let i =  0; i < row.length; i++) {
        // check every 2
        if (row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);

    while (row.length < columns) {
        row.push(0)
    }

    return row;
}


function slideLeft () {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight () {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp () {
    for (let c = 0; c < columns; c++ ){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];

            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }

    }
}

function slideDown () {
    for (let c = 0; c < columns; c++ ){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

  
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }

    }
}

function hasEmptyTile () {
    for (r = 0; r < rows; r++) {
        for (c = 0; c < columns; c++)  {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        // get random r, c value
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }``
}


function restart() {
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ];

    let tile = document.getElementsByClassName('tile')

    Array.prototype.forEach.call(tile, function(box) {
        // Do stuff here
        box.innerText = "";
        box.classList.value = ""; // Clear the class 
        box.classList.add("tile");
    });
    


    score = 0;
    document.getElementById("score").innerHTML = null;
    setTwo();
    setTwo();

}


