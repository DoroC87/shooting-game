// キャンバス設定
let canvas;
let ctx;

// キーボード値
const K_RIGHT = 39;
const K_LEFT = 37;
const K_UP = 38;
const K_DOWN = 40;
const K_SPACE = 32;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

// イメージ
let bgImg, spaceshipImg, bulletImg, enemyImg, gameOerImg;

// ロケットの差表
let spaceshipX = canvas.width / 2 - 29;
let spaceshipY = canvas.height - 65;
// ロケットの速度
let spaceshipSpeed = 5;

// 球の配列
let bulletList = [];
// 球の差表
function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX + 17.5;
    this.y = spaceshipY;

    bulletList.push(this);
  };

  this.update = function () {
    this.y -= 7;
  };
}

// イメージ設定
function loadImage() {
  bgImg = new Image();
  bgImg.src = "images/background.png";

  spaceshipImg = new Image();
  spaceshipImg.src = "images/spaceship.png";

  bulletImg = new Image();
  bulletImg.src = "images/bullet.png";

  enemyImg = new Image();
  enemyImg.src = "images/enemy.png";

  gameOerImg = new Image();
  gameOerImg.src = "images/gameover.png";
}

function render() {
  // 背景
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  // ロケット
  ctx.drawImage(spaceshipImg, spaceshipX, spaceshipY);
  // 球のイメージ表示
  for (let i = 0; i < bulletList.length; i++) {
    ctx.drawImage(bulletImg, bulletList[i].x, bulletList[i].y);
  }
}

let keysDown = {};
function setKeyboardListener() {
  // 押下されたキーボードの値取得
  document.addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  });
  // 押下された後キーボードの値削除
  document.addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];

    if (e.keyCode == K_SPACE) {
      createBullet();
    }
  });
}

/** ロケットの動き設定
 * キャンバスの中のみ移動可能にする */
function update() {
  // 右側制限値
  let limit_Right = canvas.width - spaceshipImg.width;
  // 下段制限値
  let limit_Bottom = canvas.height - spaceshipImg.height;

  if (K_RIGHT in keysDown) {
    spaceshipX >= limit_Right
      ? (spaceshipX = limit_Right)
      : (spaceshipX += spaceshipSpeed);
  }

  if (K_LEFT in keysDown) {
    spaceshipX <= 0 ? (spaceshipX = 0) : (spaceshipX -= spaceshipSpeed);
  }

  if (K_UP in keysDown) {
    // spaceshipY -= spaceshipSpeed;
    spaceshipY <= 0 ? (spaceshipY = 0) : (spaceshipY -= spaceshipSpeed);
  }

  if (K_DOWN in keysDown) {
    spaceshipY >= limit_Bottom
      ? (spaceshipY = limit_Bottom)
      : (spaceshipY += spaceshipSpeed);
  }

  // 球のY座標更新
  for (let i = 0; i < bulletList.length; i++) {
    bulletList[i].update();
  }
}

function main() {
  update(); // 差表の更新
  render(); // 画面表示
  requestAnimationFrame(main);
}

// 球の生成
function createBullet() {
  console.log("test");
  let bullet = new Bullet();
  bullet.init();
}

loadImage();
setKeyboardListener();
main();
