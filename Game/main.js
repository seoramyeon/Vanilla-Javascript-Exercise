'use strict';

const gameField = document.querySelector('.game__field');
const gameFieldRec = gameField.getBoundingClientRect();
const playBtn = document.querySelector('.game__button');
const timer = document.querySelector('.game__timer');
const score = document.querySelector('.game__score');
const popup = document.querySelector('.pop-up');

let gameStarted = false;
const COUNT_CARROT = 5;
const COUNT_BUG = 5
const SET_TIME = 10
let gameScore = COUNT_CARROT;

score.textContent = `${gameScore}`
timer.textContent = 'Ready!'

playBtn.addEventListener('click', () => {
  // console.log('play!')
  playBtn.innerHTML = `<i class="fas fa-stop"></i>`;
	initGame();
})

function initGame() {
  // console.log(gameFieldRec);
  addItem('carrot', COUNT_CARROT, 'img/carrot.png');
  addItem('bug', COUNT_BUG, 'img/bug.png');
  startTimer(SET_TIME);
}

function addItem(className, count, imgPath) {
  const itemImgSize = 90;
  const x1 = 0;
  const y1 = 0;
  const x2 = gameFieldRec.width - itemImgSize;
  const y2 = gameFieldRec.height - itemImgSize;
  console.log('x2:', x2);
  console.log('y2:', y2);

  for(let i = 0; i < count; i++) {
    const item = document.createElement('img')
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';

    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    gameField.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
};

function startTimer(startTime) {
  const setTimer =  setInterval(() => {
    startTime--;
    if(startTime > 0) { 
      timer.textContent = `${startTime} sec`
    } else {
      timer.textContent = `END`;
      playBtn.innerHTML = `<i class="fas fa-play"></i>`;
      clearInterval(setTimer);
    }
    // console.log(startTime);
  }, 500)
}

gameField.addEventListener('click', (event) => {
  console.log(event.target.className);
  const target = event.target;
  if(target.className ==='carrot') {
    --gameScore;
    score.textContent = `${gameScore}`
    target.style.display = 'none'
    target.setAttribute('class', 'clickedCarrot');
  } else if(target ==='bug') {
    stopGame();
  }
  else if(gameScore === 0) {
    stopGame();
  }
})

const replay = document.querySelector('.pop-up__refresh');
replay.addEventListener('click', () => {
})

function stopTimer() {
  timer.textContent = `END`;
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

function stopGame() {
}
