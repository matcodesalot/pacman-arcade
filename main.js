//Define the canvas, getContext, and canvas dimensions
const canvas = document.getElementById(`canvas`);
const ctx = canvas.getContext(`2d`);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

let score = 0;

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
        this.radius = 15;
        this.speed = 3;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `yellow`;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.x <= 0) {
            console.log("we out this piece");
        }
        if(this.position.x >= canvas.width) {
            console.log("we also out this piece");
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

function circleCollidesWithRectangle({player, boundary}) {
    return(player.position.y - player.radius + player.velocity.y <= boundary.position.y + boundary.height && 
        player.position.x + player.radius + player.velocity.x >= boundary.position.x && 
        player.position.y + player.radius + player.velocity.y >= boundary.position.y && 
        player.position.x - player.radius + player.velocity.x <= boundary.position.x + boundary.width);
}



//Main game loop
function gameLoop() {
    //Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(keys.up.pressed && lastKey === `up`) {
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(circleCollidesWithRectangle({
                player: {...player, velocity: {
                    x: 0,
                    y: -player.speed
                }},
                boundary: boundary
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
            if(circleCollidesWithRectangle({
                player: {...player, velocity: {
                    x: 0,
                    y: player.speed
                }},
                boundary: boundary
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
            if(circleCollidesWithRectangle({
                player: {...player, velocity: {
                    x: -player.speed,
                    y: 0
                }},
                boundary: boundary
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
            if(circleCollidesWithRectangle({
                player: {...player, velocity: {
                    x: player.speed,
                    y: 0
                }},
                boundary: boundary
            })) {
                player.velocity.x = 0;
                break;
            }
            else {
                player.velocity.x = player.speed;
            }
        }
    }

    foods.forEach((food, i) => {
        food.draw();

        if(circleCollidesWithRectangle({
            player: player,
            boundary: food
        })) {
            foods.splice(i, 1);
            //console.log(score++);
        }
    });

    boundaries.forEach((boundary) => {
        boundary.draw();

        if(circleCollidesWithRectangle({
            player: player,
            boundary: boundary
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