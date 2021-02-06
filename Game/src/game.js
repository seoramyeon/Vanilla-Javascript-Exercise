'use strict';
import { Field, ItemType } from './field.js';
import * as sound from './sound.js';


// 오브젝트 타입을 보장하는 편법으로 Object.freeze 를 활용
export const Reason = Object.freeze ({
  win:'win',
  lose: 'lose',
  cancel: 'cancel'
})

// Builder Pattern ⭐️⭐️⭐️
export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    console.log(this);
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
	constructor(gameDuration, carrotCount, bugCount ) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameStarted = false; // 게임 상태를 알기 위해
    this.score = 0;
    this.timer = undefined;

    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');
    this.gameBtn.addEventListener('click', () => {
      if(this.gameStarted) {
        this.stop(Reason.cancel);
      } else {
        this.start(Reason.lose);
      }
    })

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.gameStarted = true;
    this.score = 0;
    this.init();
    this.showStopButton();
    this.startTimer(this.gameDuration);
    this.updateScoreBoard();
    sound.playBackground();
  }
  
  stop(reason) {
    this.gameStarted = false;
    this.hidePlayButton();
    this.stopTimer();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  showStopButton() {
    this.gameBtn.style.visibility = 'visible';
    const playIcon = this.gameBtn.querySelector('.fas');
    playIcon.classList.add('fa-stop');
    playIcon.classList.remove('fa-play');
  }

  hidePlayButton() {
    this.gameBtn.style.visibility = 'hidden';
  }

  init() {
    this.gameTimer.textContent = `${this.gameDuration} sec`;
    this.gameField.init()
  }
  
  startTimer() {
    let remainingTime = this.gameDuration;
    this.timer = setInterval(() => {
      if(remainingTime <= 0) {  //항상 예외상태 먼저 처리
        clearInterval(this.timer);
        this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
        return;
      } else {
        this.updateTimerText(--remainingTime);
      }
    }, 1000)
  }
  
  stopTimer() {
    clearInterval(this.timer);
    this.gameTimer.innerText = `END`;
  }
  
  updateTimerText(time) {
    this.gameTimer.innerText = `${time} sec`;
  }
  
  updateScoreBoard() {
    this.gameScore.style.visibility = 'visible';
    this.gameScore.innerText = this.carrotCount - this.score;
  }

  onItemClick = (item) => {
    if(!this.gameStarted) return;
    if(item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      if(this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if(item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  }
}