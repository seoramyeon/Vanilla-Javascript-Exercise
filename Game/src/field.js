'use strict';
import * as sound from './sound.js';

const SIZE_CARROT = 80;

export const ItemType = Object.freeze ({
  carrot: 'carrot',
  bug: 'bug'
})

export class Field {
	constructor(carrotCount, bugCount) {
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;
		this.field = document.querySelector('.game__field');
    this.fieldRec = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }
  
  init() {
    this.field.innerHTML = '';
    this._addItem(ItemType.carrot, this.carrotCount, 'img/carrot.png');
    this._addItem(ItemType.bug, this.bugCount, 'img/bug.png');
  }

  // _를 붙여서 private 함수라는 걸 표시. 좋은 방법은 아님.
  _addItem(className, count, imgPath) { 
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRec.width - SIZE_CARROT;
    const y2 = this.fieldRec.height - SIZE_CARROT;
    // console.log('x2:', x2);
    // console.log('y2:', y2);
  
    for(let i = 0; i < count; i++) {
      const item = document.createElement('img')
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
  
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  // 함수를 클레스에 바인딩 하는 방법 중 하나. arrow 펑션.
  onClick = (event) => {
    const target = event.target;
    if(target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot)
    } else if(target.matches('.bug')) {
      sound.playBug();
      this.onItemClick && this.onItemClick(ItemType.bug)
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
};