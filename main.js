//Define the canvas and getContext
const canvas = document.getElementById(`canvas`);
const ctx = canvas.getContext(`2d`);

const scoreEl = document.getElementById(`scoreEl`);
const audioBtn = document.getElementById(`audioBtn`);

//Define the 3D map that represents the scene
//1: boundary, 0: empty space, 2: player spawn point
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const cellSize = 40; //Size of each cell in pixels
const scalingFactor = 1; //Adjust this value to scale down the map

const scaledCellSize = cellSize * scalingFactor;

//Calculate the width and height of the scaled map
const scaledMapWidth = map[0].length * scaledCellSize;
const scaledMapHeight = map.length * scaledCellSize;

//Set the canvas dimensions the scaled size of the map
canvas.width = scaledMapWidth;
canvas.height = scaledMapHeight;

function createRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function createRectOutline(x, y, width, height, color) {
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, width, height);
}



class Boundary {
    static width = 40;
    static height = 40;
    constructor({position, width, height, color}) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        createRect(this.position.x, this.position.y, this.width, this.height, this.color);
    }
}

class Player {
    constructor({position, velocity}) {
        this.position = position || {x: 0, y: 0};
        this.velocity = velocity || {x: 0, y: 0};
        this.speed = 3;

        const sprite = new Image();
        sprite.src = `./assets/sprites/pacman.png`;

        sprite.onload = () => {
            const scale = 0.9;
            this.sprite = sprite;
            this.width = sprite.width * scale;
            this.height = sprite.height * scale;
        }
    }

    draw() {
        if(this.sprite) {
            ctx.drawImage(this.sprite, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
            //createRectOutline(this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height, `red`);
        }
    }

    update() {
        if(this.sprite) {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

            if(this.position.x <= 0) {
                this.position.x = canvas.width;
            }
            else if(this.position.x >= canvas.width) {
                this.position.x = 0;
            }
        }
    }
}

class Food {
    constructor({position}) {
        this.position = position;
        this.width = 5;
        this.height = 5;
    }

    draw() {
        createRect(this.position.x, this.position.y, this.width, this.height, `white`);
    }
}

const boundaries = [];
const foods = [];
const player = new Player({});

const keys = {
    up: {
        pressed: false
    },
    down: {
        pressed: false
    },
    left: {
        pressed: false
    },
    right: {
        pressed: false
    }
}

let lastKey = ``;
let score = 0;
let muted = false;

const oneBlockSize = 40;
const wallColor = `#1a1ac7`;
const wallInnerColor = `black`;
const wallSpaceWidth = oneBlockSize / 1.2;
const wallOffset = (oneBlockSize - wallSpaceWidth) / 2;


//iterate over the map
for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
        const symbol = map[row][col];

        //Check if the current cell contains a 1
        if (symbol === 1) {
            boundaries.push(new Boundary({
                position: {
                    x: col * Boundary.width,
                    y: row * Boundary.height
                },
                width: Boundary.width,
                height: Boundary.height,
                color: wallColor
            }));

            //Check if neighboring cells are also walls
            const topCell = row > 0 && map[row - 1][col] === 1;
            const bottomCell = row < map.length - 1 && map[row + 1][col] === 1;
            const leftCell = col > 0 && map[row][col - 1] === 1;
            const rightCell = col < map[row].length - 1 && map[row][col + 1] === 1;

            if(topCell) {
                boundaries.push(new Boundary({
                    position: {
                        x: col * Boundary.width + wallOffset,
                        y: row * Boundary.height
                    },
                    width: Boundary.width / 1.2,
                    height: Boundary.height / 1.2 + wallOffset,
                    color: wallInnerColor
                }));
            }

            if(bottomCell) {
                boundaries.push(new Boundary({
                    position: {
                        x: col * Boundary.width + wallOffset,
                        y: row * Boundary.height + wallOffset
                    },
                    width: Boundary.width / 1.2,
                    height: Boundary.height / 1.2 + wallOffset,
                    color: wallInnerColor
                }));
            }

            if(leftCell) {
                boundaries.push(new Boundary({
                    position: {
                        x: col * Boundary.width,
                        y: row * Boundary.height + wallOffset
                    },
                    width: Boundary.width / 1.2 + wallOffset,
                    height: Boundary.height / 1.2,
                    color: wallInnerColor
                }));
            }

            if(rightCell) {
                boundaries.push(new Boundary({
                    position: {
                        x: col * Boundary.width + wallOffset,
                        y: row * Boundary.height + wallOffset
                    },
                    width: Boundary.width / 1.2 + wallOffset,
                    height: Boundary.height / 1.2,
                    color: wallInnerColor
                }));
            }
        }

        //Check if the current cell contains a 2
        if (symbol === 2) {
            player.position.x = col * Boundary.width + Boundary.width / 2;
            player.position.y = row * Boundary.height + Boundary.height / 2;
        }

        //Check if the current cell contains a 0
        if (symbol === 0) {
            foods.push(new Food({
                position: {
                    x: col * Boundary.width + Boundary.width / 2,
                    y: row * Boundary.height + Boundary.height / 2
                }
            }));
        }
    }
}



window.addEventListener(`keydown`, (e) => {
    e.preventDefault();
    switch(e.key) {
        case `ArrowUp`:
        case `w`:
            keys.up.pressed = true;
            lastKey = `up`;
            break;
        case `ArrowDown`:
        case `s`:
            keys.down.pressed = true;
            lastKey = `down`;
            break;
        case `ArrowLeft`:
        case `a`:
            keys.left.pressed = true;
            lastKey = `left`;
            break;
        case `ArrowRight`:
        case `d`:
            keys.right.pressed = true;
            lastKey = `right`;
            break;
    }
});

window.addEventListener(`keyup`, (e) => {
    switch(e.key) {
        case `ArrowUp`:
        case `w`:
            keys.up.pressed = false;
            break;
        case `ArrowDown`:
        case `s`:
            keys.down.pressed = false;
            break;
        case `ArrowLeft`:
        case `a`:
            keys.left.pressed = false;
            break;
        case `ArrowRight`:
        case `d`:
            keys.right.pressed = false;
            break;
    }
});

audioBtn.addEventListener(`click`, () => {
    muted = !muted;
});

function playAudio(filePath) {
    let audio = new Audio(filePath);
    audio.play();
}

function circleCollidesWithRectangle({circle, rect}) {
    return(circle.position.y - circle.radius + circle.velocity.y <= rect.position.y + rect.height && 
        circle.position.x + circle.radius + circle.velocity.x >= rect.position.x && 
        circle.position.y + circle.radius + circle.velocity.y >= rect.position.y && 
        circle.position.x - circle.radius + circle.velocity.x <= rect.position.x + rect.width);
}

function rectCollidesWithRect({rect1, rect2}) {
    return (rect1.position.x + (rect1.width / 2) + rect1.velocity.x >= rect2.position.x && 
        rect1.position.x - (rect1.width / 2) + rect1.velocity.x <= rect2.position.x + rect2.width && 
        rect1.position.y + (rect1.height / 2) + rect1.velocity.y >= rect2.position.y && 
        rect1.position.y - (rect1.height / 2) + rect1.velocity.y <= rect2.position.y + rect2.height);
}

function spriteCollidesWithRect({sprite, rect}) {
    return (sprite.position.x + sprite.velocity.x < rect.x + rect.width &&
        sprite.position.x + sprite.velocity.x + sprite.width > rectangle.x &&
        sprite.position.y + sprite.velocity.y < rect.y + rect.height &&
        sprite.position.y + sprite.velocity.y + sprite.height > rect.y);
}


//Main game loop
function gameLoop() {
    //Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(keys.up.pressed && lastKey === `up`) {
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(rectCollidesWithRect({
                rect1: {...player, velocity: {
                    x: 0,
                    y: -player.speed
                }},
                rect2: boundary
            })) {
                player.velocity.y = 0;
                break;
            }
            else {
                player.velocity.y = -player.speed;
            }
        }
    }
    if(keys.down.pressed && lastKey === `down`) {
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(rectCollidesWithRect({
                rect1: {...player, velocity: {
                    x: 0,
                    y: player.speed
                }},
                rect2: boundary
            })) {
                player.velocity.y = 0;
                break;
            }
            else {
                player.velocity.y = player.speed;
            }
        }
    }
    if(keys.left.pressed && lastKey === `left`) {
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(rectCollidesWithRect({
                rect1: {...player, velocity: {
                    x: -player.speed,
                    y: 0
                }},
                rect2: boundary
            })) {
                player.velocity.x = 0;
                break;
            }
            else {
                player.velocity.x = -player.speed;
            }
        }
    }
    if(keys.right.pressed && lastKey === `right`) {
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(rectCollidesWithRect({
                rect1: {...player, velocity: {
                    x: player.speed,
                    y: 0
                }},
                rect2: boundary
            })) {
                player.velocity.x = 0;
                break;
            }
            else {
                player.velocity.x = player.speed;
            }
        }
    }

    //Iterate backwards through the array to avoid any rendering bugs
    for(let i = foods.length - 1; 0 <= i; i--) {
        const food = foods[i];

        food.draw();

        if(rectCollidesWithRect({
            rect1: player,
            rect2: food
        })) {
            foods.splice(i, 1);
            score += 10;
            scoreEl.innerHTML = score;
            if(!muted) {
                playAudio(`./assets/sounds/foodeat.wav`);
            }
        }
    }

    boundaries.forEach((boundary) => {
        boundary.draw();

        if(rectCollidesWithRect({
            rect1: player,
            rect2: boundary
        })) {
            player.velocity.x = 0;
            player.velocity.y = 0;
        }
    });

    player.update();

    //Request the next frame
    window.requestAnimationFrame(gameLoop);
}

//Start the game loop
gameLoop();