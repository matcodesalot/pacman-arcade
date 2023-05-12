//Define the canvas, getContext, and canvas dimensions
const canvas = document.getElementById(`canvas`);
const ctx = canvas.getContext(`2d`);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Define the 3D map that represents the scene
//1: boundary, 0: empty space
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let score = 0;


class Boundary {
    static width = 40;
    static height = 40;
    constructor({position}) {
        this.position = position;
        this.width = 40;
        this.height = 40;
    }

    draw() {
        ctx.fillStyle = `#1a1ac7`;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Player {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
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
    }
}

class Food {
    constructor({position}) {
        this.position = position;
        this.width = 5;
        this.height = 5;
    }

    draw() {
        ctx.fillStyle = `white`;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const boundaries = [];
const foods = [];
const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
});

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

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch(symbol) {
            case 1:
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    }
                }));
                break;
            case 0:
                foods.push(new Food({
                    position: {
                        x: Boundary.width * j + Boundary.width / 2,
                        y: Boundary.height * i + Boundary.height / 2
                    }
                }));
                break;
        }
    });
});


window.addEventListener(`keydown`, (e) => {
    switch(e.key) {
        case `ArrowUp`:
        case `w`:
            keys.up.pressed = true;
            lastKey = `ArrowUp`;
            break;
        case `ArrowDown`:
        case `s`:
            keys.down.pressed = true;
            lastKey = `ArrowDown`;
            break;
        case `ArrowLeft`:
        case `a`:
            keys.left.pressed = true;
            lastKey = `ArrowLeft`;
            break;
        case `ArrowRight`:
        case `d`:
            keys.right.pressed = true;
            lastKey = `ArrowRight`;
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

    if(keys.up.pressed && lastKey === `ArrowUp`) {
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
    if(keys.down.pressed && lastKey === `ArrowDown`) {
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
    if(keys.left.pressed && lastKey === `ArrowLeft`) {
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
    if(keys.right.pressed && lastKey === `ArrowRight`) {
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
            console.log(score++);
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