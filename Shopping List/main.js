const items = document.querySelector('.items');
const input = document.querySelector('.input');
const addBtn = document.querySelector('.add');

function onAddClick() {
  // 1. 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  if(text === '') {
    input.focus();
    return;
  }
  console.log(text);

  // 2. 새로운 item을 생성함
  const item = createItem(text);
  console.log('item : ???', item)

  // 3. items 안에 새로 만든 item추가
  items.appendChild(item);

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

function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item_row');

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const itemName = document.createElement('span');
  itemName.setAttribute('class', 'item_name');
  itemName.innerText = text;

  const itemDelete = document.createElement('button');
  itemDelete.setAttribute('class', 'item_delete');
  itemDelete.innerHTML = `<img src='./img/delete.png' alt='delete'>`
  itemDelete.addEventListener('click', () => {
    items.removeChild(itemRow);
  })

  const itemDivider = document.createElement('div')
  itemDivider.setAttribute('class', 'item_divider');

  item.appendChild(itemName);
  item.appendChild(itemDelete);
  itemRow.appendChild(item)
  itemRow.appendChild(itemDivider);

  return itemRow;
}

// keypress 대신 keyup, keydown 으로 적용하면 한글 입력 시 
// 마지막 한 글자가 라인으로 추가 등록 되는 이슈 있음.
input.addEventListener('keypress', (event) => {
  if(event.key === 'Enter') {
    onAddClick();
  }
})