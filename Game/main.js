'use strict';

const COUNT_CARROT = 5;
const COUNT_BUG = 5;
const GAME_DURATION_SEC = 10;
const SIZE_CARROT = 80;

const gameField = document.querySelector('.game__field');
const gameFieldRec = gameField.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const scoreBoard = document.querySelector('.game__score');

const popup = document.querySelector('.pop-up');
const popupText = document.querySelector('.pop-up__message');
const popupRefresh = document.querySelector('.pop-up__refresh');

const soundCarrot = new Audio('./sound/carrot_pull.mp3');
const soundBug = new Audio('./sound/bug_pull.mp3');
const soundWin = new Audio('./sound/game_win.mp3');
const soundAlert = new Audio('./sound/alert.wav');
const soundBGM = new Audio('./sound/bg.mp3');



let gameStarted = false; // 게임 상태를 알기 위해
let scoreNumber = 0;
let timer = undefined;

scoreBoard.style.visibility = 'hidden';
gameTimer.textContent = 'Ready!'

gameBtn.addEventListener('click', () => {
  if(gameStarted) {
    stopGame();
  } else {
    startGame();
  }
  console.log('gameStarted :', gameStarted);
})

popupRefresh.addEventListener('click', () => {
  startGame();
  hidePopup();
})

function startGame() {
  gameStarted = true;
  scoreNumber = 0;
  initGame();
  showStopButton();
  startTimer(GAME_DURATION_SEC);
  updateScoreBoard();
  palySound(soundBGM);
}

function stopGame() {
  gameStarted = false;
  stopTimer();
  hidePlayButton();
  showPopupWithText('Replay?');
  palySound(soundAlert);
  stopSound(soundBGM);
}

function finishGame(win) {
  gameStarted = false;
  stopTimer();
  hidePlayButton();
  if(win) {
    palySound(soundWin);
  } else {
    palySound(soundAlert);
  }
  stopSound(soundBGM);
  showPopupWithText(win ? 'YOU WON!' : 'YOU LOST!')
}

function showStopButton() {
  gameBtn.style.visibility = 'visible';
  const playIcon = gameBtn.querySelector('.fas');
  playIcon.classList.add('fa-stop');
  playIcon.classList.remove('fa-play');
}

function hidePlayButton() {
  gameBtn.style.visibility = 'hidden';
}

function initGame() {
  gameTimer.textContent = `${GAME_DURATION_SEC} sec`;
  gameField.innerHTML = '';
  // console.log(gameFieldRec);
  addItem('carrot', COUNT_CARROT, 'img/carrot.png');
  addItem('bug', COUNT_BUG, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = gameFieldRec.width - SIZE_CARROT;
  const y2 = gameFieldRec.height - SIZE_CARROT;
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

function startTimer() {
  let remainingTime = GAME_DURATION_SEC;
  timer = setInterval(() => {
    if(remainingTime <= 0) {  //항상 예외상태 먼저 처리
      clearInterval(timer);
      finishGame(COUNT_CARROT === scoreNumber);
      return;
    } else {
      updateTimerText(--remainingTime);
    }
  }, 1000)
}

function stopTimer() {
  clearInterval(timer);
  gameTimer.innerText = `END`;
}

function updateTimerText(time) {
  gameTimer.innerText = `${time} sec`;
}

gameField.addEventListener('click', onFieldClick);

function onFieldClick(event) {
  if(!gameStarted) return;

  const target = event.target;
  if(target.matches('.carrot')) {
    target.remove();
    scoreNumber++;
    palySound(soundCarrot);
    updateScoreBoard();
    if(scoreNumber === COUNT_CARROT) {
      finishGame(true);
    }
  } else if(target.matches('.bug')) {
    palySound(soundBug);
    finishGame(false);
  }
}

function palySound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  scoreBoard.style.visibility = 'visible';
  scoreBoard.innerText = COUNT_CARROT - scoreNumber;
}

function showPopupWithText(text) {
  popup.classList.remove('pop-up__hide')
  popupText.innerText = text;
}

function hidePopup() {
  popup.classList.add('pop-up__hide')
}
