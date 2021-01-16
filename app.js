const body = document.querySelector('body')
const canvas = document.getElementById('canvas');
const bq = document.querySelector('blockquote');
const runs = document.querySelector('h2');
const ctx = canvas.getContext('2d');
let score = 0;
const Rows = 10;
const Columns = 9;
const delay = 500;
const wCanvas = canvas.width
const hCanvas = canvas.height

const ball = {
  x: wCanvas / 2,
  y: hCanvas - 52,
  size: 10,
  speed: 3,
  dx: 4,
  dy: -4,
  visible: true
};

const paddle = {
  x: wCanvas / 2 - 40,
  y: hCanvas - 50,
  w: 100,
  h: 20,
  speed: 10,
  dx: 0,
  visible: true
};

const blockLoc = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
};

const blocks = [];
for (let i = 0; i < Rows; i++) {
  blocks[i] = [];
  for (let j = 0; j < Columns; j++) {
    const x = i * (blockLoc.w + blockLoc.padding) + blockLoc.offsetX;
    const y = j * (blockLoc.h + blockLoc.padding) + blockLoc.offsetY;
    blocks[i][j] = { x, y, ...blockLoc };
  }
}

colors = ['#fbbc05', '#34a853', '#ea4335', '#4285f4']
colorOne = colors[Math.floor(Math.random() * colors.length)]
colorTwo = colors[Math.floor(Math.random() * colors.length)]
const colorTrio = colors[Math.floor(Math.random() * colors.length)]
colorFor = colors[Math.floor(Math.random() * colors.length)]


function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = ball.visible ? colorOne : 'transparent';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = paddle.visible ? colorTwo : 'transparent';
  ctx.fill();
  ctx.closePath();
}


function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillStyle = colorFor
  ctx.fillText(`Score: ${score}`, wCanvas - 100, 30);
}

function drawblocks() {
  blocks.forEach(column => {
    column.forEach(block => {
      ctx.beginPath();
      ctx.rect(block.x, block.y, block.w, block.h);
      ctx.fillStyle = block.visible ? colorTrio : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}


function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.size > wCanvas || ball.x - ball.size < 0) {
    ball.dx *= -1; 
  }

  if (ball.y + ball.size > hCanvas || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  blocks.forEach(column => {
    column.forEach(block => {
      if (block.visible) {
        if (
          ball.x - ball.size > block.x && 
          ball.x + ball.size < block.x + block.w && 
          ball.y + ball.size > block.y && 
          ball.y - ball.size < block.y + block.h 
        ) {
          ball.dy *= -1;
          block.visible = false;

          TopScore();
        }
      }
    });
  });

  if ( hCanvas < ball.y + ball.size ) {
    showAllblocks();
    score = 0;
  }
}

function PaddleSlide() {
  paddle.x += paddle.dx;
  if (paddle.x < 0) { paddle.x = 0; }
  if (paddle.x + paddle.w > wCanvas) { paddle.x = wCanvas - paddle.w; }
}


function TopScore() {
  score++;
  if (score % (Rows * Columns) === 0) {
      ball.visible = false;
      paddle.visible = false;
      setTimeout(
        function () {
          showAllblocks();
          score = 0;
          paddle.x = wCanvas / 2 - 40;
          paddle.y = hCanvas - 20;
          ball.x = wCanvas / 2;
          ball.y = hCanvas / 2;
          ball.visible = true;
          paddle.visible = true;
      },delay)
  }
}

function showAllblocks() {
  blocks.forEach(column => {
    column.forEach(block => (block.visible = true));
  });
}

function draw() {
  ctx.clearRect(0, 0, wCanvas, hCanvas);
  drawBall();
  drawPaddle();
  drawScore();
  drawblocks();
}

function update() {
  PaddleSlide();
  moveBall();
  draw();
  requestAnimationFrame(update);
}

function keyUp(e) {
  if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'Right' || e.key === 'ArrowRight') 
  {
    paddle.dx = 0;
  }
}

function keyDown(e) {
    if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
    else if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    }  
}

const quote = async () => { await fetch('https://api.quotable.io/random?tags=technology,famous-quotes').then(res => res.json()).then(value => postValue(value)) }

function postValue(val) {
    bq.innerHTML = `<q> ${val.content} </q><p><i><center>~ ${val.author} </center></i></p>`;
}

//  event handlers
quote();
update();
body.style.backgroundColor = colorTrio;
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
console.log('flag{Th1s_1s_4_fl4g}')
