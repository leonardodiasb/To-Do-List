import Status from './status.js';

const status = new Status();

export default class AddRm {
  addToList = (event) => {
    if (event.key === 'Enter') {
      const tdList = JSON.parse(localStorage.getItem('ToDoList'));
      const list = document.getElementById('td-section');
      if (list.lastChild === null) {
        tdList.push({
          description: event.target.value,
          completed: false,
          index: 0,
        });
        list.insertAdjacentHTML('beforeend',
          `<div class="td-item" id="${0}" draggable="true">
                        <input type="checkbox" class="checkbox"/>
                        <p contenteditable="true">${event.target.value}</p>
                        <i class="delete-line me-2 far fa-trash-alt" id="remove"></i>
                        <i class="drag-line fas fa-ellipsis-v"></i>
                    </div>`);
      } else {
        tdList.push({
          description: event.target.value,
          completed: false,
          index: Number(list.lastChild.id) + 1,
        });
        list.insertAdjacentHTML('beforeend',
          `<div class="td-item" id="${Number(list.lastChild.id) + 1}" draggable="true">
                                        <input type="checkbox" class="checkbox"/>
                                        <p contenteditable="true">${event.target.value}</p>
                                        <i class="delete-line me-2 far fa-trash-alt" id="remove"></i>
                                        <i class="drag-line fas fa-ellipsis-v"></i>
                                    </div>`);
      }
      window.location.reload();
    }
    status.saveStorage();
  }

  clearCompleted = () => {
    const itemToRemove = document.querySelectorAll('.td-item');
    const len = itemToRemove.length;
    for (let i = 0; i < len; i += 1) {
      if (itemToRemove[i].firstChild.nextSibling.checked) {
        itemToRemove[i].remove();
      }
    }
    status.saveStorage();
    window.location.reload();
  }

  editText = (e) => {
    const tdListStored = JSON.parse(localStorage.getItem('ToDoList'));
    if (e.key === 'Enter') {
      e.preventDefault();
      tdListStored[e.target.parentNode.id].description = e.target.innerText;
      status.saveStorage();
    }
  }

  removeLine = (e) => {
    const tdListStored = JSON.parse(localStorage.getItem('ToDoList'));
    const len = tdListStored.length;
    const htmlItems = document.querySelectorAll('.td-item');
    for (let i = 0; i < len; i += 1) {
      if (Number(htmlItems[i].id) === tdListStored[e.target.parentNode.id].index) {
        htmlItems[i].remove();
      }
    }
    status.saveStorage();
    window.location.reload();
  }
}