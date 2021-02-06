'use strict';
import Popup from './popup.js';
import {GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';



const game = new GameBuilder()
  .withGameDuration(10)
  .withCarrotCount(5)
  .withBugCount(5)
  .build();

game.gameScore.style.visibility = 'hidden';
game.gameTimer.textContent = 'Ready!'
game.setGameStopListener(reason => {
  console.log(reason)
  let message;
  switch(reason) {
    case Reason.cancel:
      message = 'Replay❓';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'YOU WON 🔥';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'YOU LOST 💩';
      sound.playBug();
      break;
      default:
        throw new Error('Not valid reason');
  }
  gameFinishBanner.showWithText(message);
})

const gameFinishBanner = new Popup();
gameFinishBanner.setClickListener(() => {
  game.start();
})




