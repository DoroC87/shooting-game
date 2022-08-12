// キャンバス設定
let canvas;
let ctx;

// キーボード値
const K_RIGHT = 39;
const K_LEFT = 37;
const K_UP = 38;
const K_DOWN = 40;

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
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImg, spaceshipX, spaceshipY);
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
  });
}

function update() {
  // 右側制限値
  let limit_Right = canvas.width - spaceshipImg.width;

  if (K_RIGHT in keysDown) {
    // キャンバスの中のみ移動可能にする
    spaceshipX >= limit_Right
      ? (spaceshipX = limit_Right)
      : (spaceshipX += spaceshipSpeed);
  }

  if (K_LEFT in keysDown) {
    // キャンバスの中のみ移動可能にする
    spaceshipX <= 0 ? (spaceshipX = 0) : (spaceshipX -= spaceshipSpeed);
  }

  if (K_UP in keysDown) {
    spaceshipY -= spaceshipSpeed;
  }
  if (K_DOWN in keysDown) {
    spaceshipY += spaceshipSpeed;
  }
}

function main() {
  update(); // 差表の更新
  render(); // 画面表示
  requestAnimationFrame(main);
}

loadImage();
setKeyboardListener();
main();
