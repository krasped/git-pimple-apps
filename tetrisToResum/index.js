let main = document.querySelector('.main');
let speed = 500;
let typeTetro = [];
let centerOfTetro = []; // 3-какая фигура в массива, 1,2 -y,x
let playField = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


let arrayOfTetro = [
    [
        [-1, 0, -1, 1, 0, -1, 0, 0],
        [-1, 0, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, -1, 1, 0],
        [-1, -1, 0, -1, 0, 0, 1, 0]
    ], // _|-
    [
        [-1, -1, -1, 0, 0, 0, 0, 1],
        [-1, 1, 0, 0, 0, 1, 1, 0],
        [0, -1, 0, 0, 1, 0, 1, 1],
        [-1, 0, 0, -1, 0, 0, 1, -1]
    ], // -|_
    [
        [-1, 1, 0, -1, 0, 0, 0, 1],
        [-1, 0, 0, 0, 1, 0, 1, 1],
        [0, -1, 0, 0, 0, 1, 1, -1],
        [-1, -1, -1, 0, 0, 0, 1, 0]
    ], // __|
    [
        [-1, -1, 0, -1, 0, 0, 0, 1],
        [-1, 0, -1, 1, 0, 0, 1, 0],
        [0, -1, 0, 0, 0, 1, 1, 1],
        [-1, 0, 0, 0, 1, -1, 1, 0]
    ], // |__
    [
        [-1, 0, 0, -1, 0, 0, 0, 1],
        [-1, 0, 0, 0, 0, 1, 1, 0],       
        [0, -1, 0, 0, 0, 1, 1, 0],
        [-1, 0, 0, -1, 0, 0, 1, 0]
    ], // _|_
    [
        [0, -1, 0, 0, 0, 1, 0, 2],
        [-1, 0, 0, 0, 1, 0, 2, 0],
        [0, -1, 0, 0, 0, 1, 0, 2],
        [-1, 0, 0, 0, 1, 0, 2, 0]
    ], // ___
    [
        [-1, -1, -1, 0, 0, -1, 0, 0, ],
        [-1, -1, -1, 0, 0, -1, 0, 0, ],
        [-1, -1, -1, 0, 0, -1, 0, 0, ],
        [-1, -1, -1, 0, 0, -1, 0, 0, ]
    ] // [_]
];


let mainInnerHTML = '';

function getRandomTetro(max = 7) {
    let x = Math.floor(Math.random() * max);
    return centerOfTetro = [1, 4, x, 0]; //некрасиво
}

function drowNewTetro(newTetro) {
    let tetro = newTetro;
    for (let y = 0; y < tetro.length; y += 2) {
            playField[tetro[y]][tetro[y + 1]] = 1;
        }
    drawField(); // для быстрой реакции
};

function transformTetroToAdd(positionAndTetroZeroPosition) {
    console.log(positionAndTetroZeroPosition);
    let [tetroY, tetroX, tetroNum, tetroRotateNum] = positionAndTetroZeroPosition;
    let tetro = arrayOfTetro[tetroNum][tetroRotateNum];
    let tetroNewPosition = tetro.map((value, index) => {
        return (index % 2 == 1) ? (value + tetroX) : (value + tetroY);
    });
    console.log(tetroNewPosition);
    return tetroNewPosition;
}

function replaceToRotateTetro() {
    let tetro = transformTetroToAdd(centerOfTetro);
}

function addTetro() {
    let tetro = transformTetroToAdd(getRandomTetro());
    console.log(tetro);

    for (let y = 0; y < tetro.length; y += 2)
        if (playField[tetro[y]][tetro[y + 1]] == 2) {
            console.log("конец");
            stopGame();
        } else {
            playField[tetro[y]][tetro[y + 1]] = 1;
        }
}

function canTetroMoving() {
    for (let y = 19; y >= 0; y--) {
        for (let x = 0; x < 10; x++) {
            if (playField[y][x] == 1 && (y == 19 || playField[y + 1][x] == 2)) {
                return false
            }
        }
    }
    return true;
}

function canTetroMovingLeft() {
    for (let y = 19; y >= 0; y--) {
        for (let x = 0; x < 10; x++) {
            if (playField[y][x] == 1 && (x == 0 || playField[y][x - 1] == 2)) {
                return false;
            }
        }
    }
    return true;
}

function canTetroMovingRight() {
    for (let y = 19; y >= 0; y--) {
        for (let x = 0; x < 10; x++) {
            if (playField[y][x] == 1 && (x == 9 || playField[y][x + 1] == 2)) {
                return false;
            }
        }
    }
    return true;
}

function canTetroRotate() {
    return true;
}

function movingTetro() {
    if (canTetroMoving()) {
        for (let y = 19; y >= 0; y--) {
            for (let x = 0; x < 10; x++) {
                if (playField[y][x] == 1 && playField[y + 1][x] == 0) {
                    playField[y][x] = 0;
                    playField[y + 1][x] = 1;
                }
            }
        }
        centerOfTetro[0]++; // где находится центр фигуры
    } else if (!canTetroMoving()) {
        let lineStopTetro = [];
        for (let y = 19; y >= 0; y--) {
            for (let x = 0; x < 10; x++) {
                if (playField[y][x] == 1) {
                    playField[y][x] = 2;
                    lineStopTetro.push(y);
                }
            }
        }
        clearFullLines(Math.max(...lineStopTetro));
        lineStopTetro = [];
        addTetro();
    }
}
// Удаление линии при ее полном заполнении
function clearFullLines(yToStart) {
    for (let y = yToStart; y >= 0; y--) {
        if (playField[y].every((value) => value == 2)) {
            playField.slice(y, 1);
            playField.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
    }
}

function drawField() {
    mainInnerHTML = '';
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
            switch (playField[y][x]) {
                case 0:
                    mainInnerHTML += '<div class="cell"></div>';
                    break;
                case 2:
                    mainInnerHTML += '<div class="cell fixedCell"></div>';
                    break;
                case 1:
                    mainInnerHTML += '<div class="cell movingCell"></div>';
            }
        }
    }
    main.innerHTML = mainInnerHTML;
}

let temerStart;

function startGame() {
    temerStart = setTimeout(startGame, speed);
    movingTetro();
    drawField();
}

function stopGame() {
    clearInterval(temerStart);
}

function moveLeft() {
    for (let y = 19; y >= 0; y--) {
        for (let x = 0; x < 10; x++) {
            if (playField[y][x] == 1 && playField[y][x - 1] == 0) {
                playField[y][x - 1] = 1;
                playField[y][x] = 0;
            }
        }
    }
    centerOfTetro[1]--;
    drawField();
}

function moveRight() {
    for (let y = 19; y >= 0; y--) {
        for (let x = 9; x >= 0; x--) {
            if (playField[y][x] == 1 && playField[y][x + 1] == 0) {
                playField[y][x + 1] = 1;
                playField[y][x] = 0
            }
        }
    }
    centerOfTetro[1]++;
    drawField();
}
//Move faster
function moveFaster(faster) {
    speed = faster;
}

function rotateTetro() {
    if (canTetroRotate()) {
        centerOfTetro[3]++; //next type of tetro to drow
        if(centerOfTetro[3] == 4) {centerOfTetro[3] = 0;} //каждого элемента по 4 штуки
        console.log(centerOfTetro[3]);
        for (let y = 19; y >= 0; y--) {
            for (let x = 9; x >= 0; x--) {
                if (playField[y][x] == 1) { //delete tetro
                    playField[y][x] = 0
                }
            }
        }
        drowNewTetro(transformTetroToAdd(centerOfTetro));
    }
}

document.addEventListener("keydown", event => {
    if (event.key == "ArrowUp") {
        console.log("up");
        rotateTetro();
    }
});

document.addEventListener("keydown", event => {
    if (event.key == " " || event.key == "ArrowDown") {
        moveFaster(50);
    }
});

document.addEventListener("keyup", event => {
    if (event.key == " " || event.key == "ArrowDown") {
        moveFaster(200);
    }
});

document.addEventListener("keydown", event => {
    if (event.key == "ArrowLeft" && canTetroMovingLeft()) {
        moveLeft();
    }
});

document.addEventListener("keydown", event => {
    if (event.key == "ArrowRight" && canTetroMovingRight()) {
        moveRight();
    }
});



addTetro();
drawField();
startGame();