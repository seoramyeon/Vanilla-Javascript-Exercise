const items = document.querySelector('.items');
const input = document.querySelector('.input');
const addBtn = document.querySelector('.add');

let count = 0;
const itemCount = document.querySelector('.item_count');
itemCount.innerText = `총 ${count}개`;

function onAddClick() {
  // 1. 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  // console.log(text);
  if(text === '') {
    input.focus();
    return;
  }

  // 2. 새로운 item을 생성함
  const item = createItem(text);

  // 3. items 안에 새로 만든 item추가
  items.appendChild(item);

  // 3.5 item개수 업데이트
  updateItemCount();

  // 4. 추가된 아이템으로 스크롤링
  item.scrollIntoView({behavior:'smooth', block: 'end'});

  // 5. 인풋 초기화 함
  input.value = '';
  input.focus();
}

addBtn.addEventListener('click', () => {
  //item.scrollIntoView 적용안되는 문제
  onAddClick();
})

let id = 0;
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item_row');
  itemRow.setAttribute('data-id', `${id + text}`)
  itemRow.innerHTML=`
    <div class="item">
      <span class="item_name">${text}</span>
      <button class='item_delete'>
        <img src='./img/delete.png' alt='delete' data-id=${id + text}>
      </button>
    </div>
  `
  id++;
  count++;
  return itemRow;
}

// keypress 대신 keyup, keydown 으로 적용하면 한글 입력 시 
// 마지막 한 글자가 라인으로 추가 등록 되는 이슈 있음.
input.addEventListener('keypress', (event) => {
  if(event.key === 'Enter') {
    onAddClick();
  }
})

// 삭제 이벤트 위임
items.addEventListener('click', (event) => {
  const id = event.target.dataset.id
  // console.log(id);
  if(id) {
    const toBeDeleted = document.querySelector(`.item_row[data-id="${id}"]`);
    toBeDeleted.remove();
    count--;
    updateItemCount();
    // console.log(toBeDeleted);
  }
})

function updateItemCount() {
  itemCount.innerText = `총 ${count}개`;
}