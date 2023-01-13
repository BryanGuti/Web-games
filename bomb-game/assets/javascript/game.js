// DOM ELEMENTS

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const buttons = document.querySelectorAll('.buttons > img');
const life = document.querySelector('#lifes');

// GLOBAL VARIABLES

const x = 0.05;
const y = 0.12;
const gap = 0.09;
const font = gap - 0.012;
const mapSize = 10;
const key = {
  38: 'up',
  40: 'down',
  37: 'left',
  39: 'right',
}
const player = {
  positionX: null,
  positionY: null,
  coordinateX: null,
  coordinateY: null,
}
const mapsLength = newMaps.length;

let level = 1;
let lifes = 5;
let map;
let isStart;
let hasExploded;
let width;
let lastEmoji;

// GAME FUNCTIONS

function startGame() {
  if(isStart === undefined){
    window.addEventListener('resize', responsiveGame);
    printLifes();
  }

  if (lifes <= 0 || level > mapsLength) return;

  isStart = true;
  hasExploded = false;
  map = newMaps[level - 1];
  lastEmoji = 'Player';
  responsiveGame();

  window.addEventListener('keyup', movePlayer);
  buttons.forEach( button => {
    button.addEventListener('click', movePlayer);
  });
}

function responsiveGame() {
  let windowWidth = window.innerWidth;
  let size;

  if (windowWidth <= 500) size = 0.85;
  else if (windowWidth <= 700) size = 0.6;
  else if (windowWidth <= 1000) size = 0.5;
  else size = 0.4;

  canvas.width = windowWidth * size;
  canvas.height = windowWidth * size;
  width = canvas.width;
  game.font = `${(font) * width}px Arial`;

  printGame();
}

function printMap() {
  let i, j, emoji;
  let mapX = x;
  let mapY = y;

  clearMap();

  for (i = 0; i < mapSize; i++) {
    for ( j = 0; j < mapSize; j++) {
      emoji = map[i][j]
      game.fillText(emojis[emoji], width * mapX, width * mapY);


      if (emojis[emoji] === '🚪' && isStart) {
        player.positionX = mapX;
        player.positionY = mapY;
        player.coordinateX = j;
        player.coordinateY = i;
        isStart = false;
      }

      mapX += gap;
    }
    mapY += gap;
    mapX = x;
  }
}

function movePlayer(event) {
  if (event.target.id === 'up' || key[event.keyCode] === 'up') moveUp();
  else if (event.target.id === 'down' || key[event.keyCode] === 'down') moveDown();
  else if (event.target.id === 'right' || key[event.keyCode] === 'right') moveRight();
  else if (event.target.id === 'left' || key[event.keyCode] === 'left') moveLeft();
  else return;

  printGame();
}

function moveUp() {
  if ((player.coordinateY - 1) < 0) return;

  player.positionY -= gap;
  player.coordinateY--;
}

function moveDown() {
  if ((player.coordinateY + 1) > (mapSize - 1)) return;

  player.positionY += gap;
  player.coordinateY++;
}

function moveRight() {
  if ((player.coordinateX + 1) > (mapSize - 1)) return;

  player.positionX += gap;
  player.coordinateX++;
}

function moveLeft() {
  if ((player.coordinateX -1) < 0) return;

  player.positionX -= gap;
  player.coordinateX--;
}

function clearMap() {
  game.clearRect(0, 0, width, width);
}

function printEmoji(emojiX, emojiY) {
  game.fillText(emojis[lastEmoji], width * emojiX, width * emojiY);
}

function clearEmoji(){
  game.clearRect(width * player.positionX, width * (player.positionY - font + 0.005), width * gap,width * gap);

}

function printPlayer() {
  if (!hasExploded && emojis[lastEmoji] !== '🎁') {
    printEmoji(player.positionX, player.positionY);
    return;
  }

  if (lifes <= 0) lastEmoji = 'Lost';
  if (level > mapsLength) {
    lastEmoji = 'Win';
    buttons.forEach(button => {
      button.removeEventListener('click', movePlayer);
    });
    window.removeEventListener('keyup', movePlayer);
  }
  clearEmoji();
  printEmoji(player.positionX, player.positionY);

  if(hasExploded) {
    printLifes();
    buttons.forEach(button => {
      button.removeEventListener('click', movePlayer);
    });
    window.removeEventListener('keyup', movePlayer);

    setTimeout(startGame, 1000);
    return;
  }
  startGame();
}

function printGame() {
  printMap();
  if (emojis[lastEmoji] !== '💥') {
    lastEmoji = map[player.coordinateY][player.coordinateX];
  }
  if (emojis[lastEmoji] === ' ' || emojis[lastEmoji] === '🚪') {
    lastEmoji = 'Player';
    printPlayer();
  } else if (emojis[lastEmoji] === '💣️' && lifes > 0){
    lastEmoji = 'Collision';
    hasExploded = true;
    lifes--;
    printPlayer();
  } else if (emojis[lastEmoji] === '🎁') {
    level++;
    printPlayer();
  } else {
    printPlayer();
    return;
  }
}

function printLifes() {
  life.innerText = emojis['Heart'].repeat(lifes);
}

// EVENTS

window.addEventListener('DOMContentLoaded', startGame);
