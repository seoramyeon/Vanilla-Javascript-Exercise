'use strict'

const soundCarrot = new Audio('./sound/carrot_pull.mp3');
const soundBug = new Audio('./sound/bug_pull.mp3');
const soundWin = new Audio('./sound/game_win.mp3');
const soundAlert = new Audio('./sound/alert.wav');
const soundBGM = new Audio('./sound/bg.mp3');

export function playCarrot() {
	palySound(soundCarrot);
}

export function playBug() {
	palySound(soundBug);
}

export function playWin() {
	palySound(soundWin);
}

export function playAlert() {
	palySound(soundAlert);
}

export function playBackground() {
	palySound(soundBGM);
}

export function stopBackground() {
	stopSound(soundBGM);
}


function palySound(sound) {
	sound.currentTime = 0;
	sound.play();
} 

function stopSound(sound) {
	sound.pause();
}
