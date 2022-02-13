// main.js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

class Character {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
  moveUp() {
    this.row -= 1;
  }
  moveRight() {
    this.col += 1;
  }
  moveDown() {
    this.row += 1;
  }
  moveLeft() {
    this.col -= 1;
  }
}

class Treasure extends Character {
  setRandomPosition() {
    this.col = Math.floor(Math.random() * this.col);
    this.row = Math.floor(Math.random() * this.row);
  }
}
// Iteration 1
function drawGrid() {
  context.lineWidth = 1;
  //vertical lines
  for (let column = 0; column <= 500; column += 50) {
    context.beginPath();
    context.moveTo(column, 0);
    context.lineTo(column, 500);
    context.stroke();
  }
  //horizontal lines
  for (let row = 0; row <= 500; row += 50) {
    context.beginPath();
    context.moveTo(0, row);
    context.lineTo(500, row);
    context.stroke();
  }
}

const player = new Character(0, 0);
function drawPlayer() {
  const playerImage = new Image();
  playerImage.src = '/images/character-down.png';
  context.drawImage(playerImage, player.col * 50, player.row * 50);
}

function drawEverything() {
  context.clearRect(0, 0, 500, 500);
  drawGrid();
  drawPlayer();
  drawTreasure();
}

function drawTreasure() {
  const TreasureImage = new Image();
  TreasureImage.src = '/images/treasure.png';
  context.drawImage(TreasureImage, 1 * 50, 1 * 50, 50, 50);
}
drawEverything();

window.addEventListener('keydown', (event) => {
  // Stop the default behavior (moving the screen to the left/up/right/down)
  event.preventDefault();

  // React based on the key pressed
  switch (event.keyCode) {
    case 37:
      player.moveLeft();
      break;
    case 38:
      player.moveUp();
      break;
    case 39:
      player.moveRight();
      break;
    case 40:
      player.moveDown();
      break;
  }
  drawEverything();
  {
    if (player.col === Treasure.col && player.row === Treasure.row) {
      setTimeout(() => alert('You reached the goal!!'), 34);
    }
  }
});

setTimeout(() => drawEverything(), 34); // always the last one
