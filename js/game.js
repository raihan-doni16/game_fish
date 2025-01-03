// canvas setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 1400;
canvas.height = 1100;

let score1 = 0;
let score2 = 0;
let gameFrame = 0;
ctx.font = "80px Georgia";
let gameOver = false;
let cek1 = false;
let cek2 = false;

const keys = [];

// player position
const player1 = {
  x: 400,
  y: 500,
  width: 90,
  height: 59,
  frameX: 0,
  frameY: 0,
  speed: 12,
  moving: false,
};
const player2 = {
  x: 800,
  y: 500,
  width: 90,
  height: 59,
  frameX: 0,
  frameY: 0,
  speed: 12,
  moving: false,
};
//player 1
const playerSprite1left = new Image();
playerSprite1left.src = "../asset/fish1_left.png";
const playerSprite1right = new Image();
playerSprite1right.src = "../asset/fish1_right.png";

//player 2
const playerSprite2left = new Image();
playerSprite2left.src = "../asset/fish2_left.png";
const playerSprite2right = new Image();
playerSprite2right.src = "../asset/fish2_right.png";

//background
const background = new Image();
background.src = "../asset/bg.jpg";

// draw image

// keyboard control
window.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
});

window.addEventListener("keyup", function (e) {
  delete keys[e.keyCode];
});

function movePlayer() {
  //control player 1
  if (keys[87] && player1.y > 0) {
    player1.y -= player1.speed;
  }
  if (keys[65] && player1.x > 0) {
    player1.x -= player1.speed;
    cek1 = false;
  }
  if (keys[83] && player1.y < canvas.height - player1.height) {
    player1.y += player1.speed;
  }
  if (keys[68] && player1.x < canvas.width - player1.width) {
    player1.x += player1.speed;
    cek1 = true;
  }

  // control player 2
  if (keys[38] && player2.y > 0) {
    player2.y -= player2.speed;
  }
  if (keys[37] && player2.x > 0) {
    player2.x -= player2.speed;
    cek2 = false;
  }
  if (keys[40] && player2.y < canvas.height - player2.height) {
    player2.y += player2.speed;
  }
  if (keys[39] && player2.x < canvas.width - player2.width) {
    player2.x += player2.speed;
    cek2 = true;
  }
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function handleplayer() {
  if (cek1 == true) {
    drawSprite(
      playerSprite1right,
      0,
      0,
      player1.width,
      player1.height,
      player1.x,
      player1.y,
      player1.width * 1.5,
      player1.height * 1.5
    );
  } else {
    drawSprite(
      playerSprite1left,
      0,
      0,
      player1.width,
      player1.height,
      player1.x,
      player1.y,
      player1.width * 1.5,
      player1.height * 1.5
    );
  }
  if (cek2 == true) {
    drawSprite(
      playerSprite2right,
      0,
      0,
      player2.width,
      player2.height,
      player2.x,
      player2.y,
      player2.width * 1.5,
      player2.height * 1.5
    );
  } else {
    drawSprite(
      playerSprite2left,
      0,
      0,
      player2.width,
      player2.height,
      player2.x,
      player2.y,
      player2.width * 1.5,
      player2.height * 1.5
    );
  }
}

//enemy image 1
const enemyImage = new Image();
enemyImage.src = "../asset/enemy1.png";

class Enemy {
  constructor() {
    this.x = canvas.width + 200;
    this.y = Math.random() * (canvas.height - 150) + 90;
    this.radius = 60;
    this.speed = Math.random() * 2 + 2;
    this.frame = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 430;
    this.spriteHeight = 397;
  }
  draw() {
    ctx.fillStyle = "rgba(20,20,20,0)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.drawImage(
      enemyImage,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 140,
      this.y - 250,
      this.spriteWidth / 1,
      this.spriteHeight / 1
    );
  }
  update() {
    this.x -= this.speed;
    if (this.x < 0 - this.radius * 2) {
      this.x = canvas.width + 200;
      this.y = Math.random() * (canvas.height - 150) + 90;
      this.speed = Math.random() * 5 + 1;
    }

    // enemy with player
    const dx1 = this.x - player1.x;
    const dy1 = this.y - player1.y;
    const dx2 = this.x - player2.x;
    const dy2 = this.y - player2.y;
    const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

    if (distance1 < this.radius + player1.width) {
      handlewin2();
    }
    if (distance2 < this.radius + player2.width) {
      handlewin1();
    }
  }
}

// enemy 2 image
const enemyImage2 = new Image();
enemyImage2.src = "../asset/enemy2.png";
class Musuh {
  constructor() {
    this.x = 0;
    this.y = Math.random() * (canvas.height - 20) + 100;
    this.radius = 70;
    this.speed = Math.random() * 2 + 4;
    this.frame = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 560;
    this.spriteHeight = 430;
  }
  draw() {
    ctx.fillStyle = "rgba(10,20,30,0)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.drawImage(
      enemyImage2,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 130,
      this.y - 120,
      this.spriteWidth / 2,
      this.spriteHeight / 2
    );
  }
  update() {
    this.x += this.speed;
    if (this.x > canvas.width) {
      this.x = 0;
      this.y = Math.random() * (canvas.height - 50) + 100;
      this.speed = Math.random() * 2 + 4;
    }
    const dx1 = this.x - player1.x;
    const dy1 = this.y - player1.y;
    const dx2 = this.x - player2.x;
    const dy2 = this.y - player2.y;
    const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

    if (distance1 < this.radius + player1.width) {
      handlewin2();
    } else if (distance2 < this.radius + player2.width) {
      handlewin1();
    }
  }
}

// enemny 1
const enemy1 = new Enemy();
function handleEnemies() {
  enemy1.update();
  enemy1.draw();
}

//enemy 2
const enemy2 = new Musuh();
function handleEnemies2() {
  enemy2.update();
  enemy2.draw();
}

const soundOver = document.createElement("audio");
soundOver.src = "../asset/win.mp3";

// Poin
const foodArray = [];
const foodimage = new Image();
foodimage.src = "../asset/cacing.png";
class Poin {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.radius = 15;
    this.speed = Math.random() * 5 + 1;
    this.distance1;
    this.distance2;
    this.counted = false;
    // this.sound = Math.random() <= 0.5 ? "sound1" : "sound2";
  }
  update() {
    this.y += this.speed;
    const dx1 = this.x - player1.x;
    const dy1 = this.y - player1.y;
    const dx2 = this.x - player2.x;
    const dy2 = this.y - player2.y;
    this.distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    this.distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
  }
  draw() {
    ctx.drawImage(
      foodimage,
      this.x - 5,
      this.y - 5,
      this.radius * 3,
      this.radius * 3
    );
  }
}

// Poin sound

const soundfood2 = document.createElement("audio");
soundfood2.src = "../asset/pellet.ogg";

// handle Poin
function handelfood() {
  if (gameFrame % 120 == 0) {
    foodArray.push(new Poin());
  }
  for (let i = 0; i < foodArray.length; i++) {
    foodArray[i].update();
    foodArray[i].draw();
  }
  for (let i = 0; i < foodArray.length; i++) {
    if (foodArray[i].y < 0 - foodArray[i].radius * 2) {
      foodArray.splice(i, 1);
    }
    if (foodArray[i]) {
      if (foodArray[i].distance1 < foodArray[i].radius + player1.width) {
        if (!foodArray[i].counted) {
          soundfood2.play();
          score1 += 5;
          foodArray[i].counted = true;
          foodArray.splice(i, 1);
        }
      }
    }
    if (foodArray[i]) {
      if (foodArray[i].distance2 < foodArray[i].radius + player2.width) {
        if (!foodArray[i].counted) {
          soundfood2.play();

          score2 += 5;
          foodArray[i].counted = true;
          foodArray.splice(i, 1);
        }
      }
    }
  }
}
const music = document.createElement("audio");
music.src = "../asset/music.ogg";

function handlewin1() {
  var lose1 = document.getElementById("player1");
  soundOver.play();
  gameOver = true;
  lose1.style.display = "block";
  restart1();
  exit1();
}
function handlewin2() {
  var lose1 = document.getElementById("player2");
  soundOver.play();
  gameOver = true;
  lose1.style.display = "block";
  restart2();
  exit2();
}

function restart2() {
  document.getElementById("start1").onclick = function () {
    location.reload();
  };
}

function exit2() {
  document.getElementById("exit1").onclick = function () {
    location.href = "../html/index.html";
  };
}
function restart1() {
  document.getElementById("start").onclick = function () {
    location.reload();
  };
}

function exit1() {
  document.getElementById("exit").onclick = function () {
    location.href = "../html/index.html";
  };
}

//animate
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  music.play();

  handleplayer();
  handelfood();
  handleEnemies2();
  handleEnemies();
  movePlayer();
  if (score1 >= 100) {
    handlewin1();
  } else if (score2 >= 100) {
    handlewin2();
  }

  ctx.fillStyle = "black";
  ctx.fillText("Score : " + score1, 50, 70);

  ctx.fillStyle = "red";
  ctx.fillText("Score : " + score2, 1000, 70);
  gameFrame++;
  if (!gameOver) requestAnimationFrame(animate);
}
animate();
