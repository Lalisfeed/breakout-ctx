const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// start bricks
let x = 25
let y = 20

// paddle initial position
let paddleX = 30
let paddleY = 560

const paddleFlow = {
    flow: 10,
}

// ball styles
const player = {
    posX: 70,
    posY: 550,
    size: 10,
    speed: 10,
    dx: 10,
    dy: 10
}


// create bricks
ctx.beginPath();
ctx.fillStyle = "#019dec";
for (let index = 0; index < 42; index++) {
    ctx.rect(x, y, 70, 30)
    x += 80
    if (x > canvas.width - 90) {
        x = 25
        y += 40
    }
}
ctx.fill();


// paint paddle
function Paddle() {
    ctx.beginPath();
    ctx.fillStyle = "#014bab"
    ctx.rect(paddleX, paddleY, 80, 14)
    ctx.fill()
}


// clear paddle
function clearPaddle(e) {
    ctx.clearRect(paddleX, paddleY, 80, 30)
 }


// paddle next position
// function newPaddle(z) {
//     if (z.key === 'ArrowLeft' || z.key === 'Left') {

//     }

//     if (z.key === 'ArrowRight' || z.key === 'Right') {

//     }
// }


// keys up
function keyUp(z) {
    if (z.key === 'ArrowLeft' || z.key === 'Left' ||
    z.key === 'ArrowRight' || z.key === 'Right') {
        player.dx = 0;
        player.dy = 0;
    }
}


// keys down
// clear paddle and load next paddle
function keyDown(z) {
    if (z.key === 'ArrowLeft' || z.key === 'Left') {
        clearPaddle()
        if (paddleX <= 0) {
            paddleX -= 0
        } else {
            paddleX -= 14
        }
        Paddle()
    }
        
    if (z.key === 'ArrowRight' || z.key === 'Right') {
        clearPaddle()
        if (paddleX + 80 > canvas.width) {
            paddleX += 0
        } else {
            paddleX += 14
        }
        Paddle()
    }
}


// document.addEventListener('keyup', keyUp)
document.addEventListener('keydown', keyDown)


// ball initial position
function hitBall() {
    ctx.beginPath()
    ctx.fillStyle = "#00aa00"
    ctx.arc(70, 550, 10, 0, Math.PI * 2)
    ctx.fill()
}


// load paddle for first time
Paddle()


// call for  ball action
function breakOut() {
    hitBall()
    requestAnimationFrame(Paddle)
}
breakOut()


// score count
let score = 0
function Score() {
    // calling this function if ball touches the brick
    if (1 > 3) {
        score += 1
        document.querySelector('span').innerHTML = score
    }
}