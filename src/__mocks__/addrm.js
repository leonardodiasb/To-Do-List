import Status from './status.js';

const status = new Status();

export default class AddRm {
  addToList = () => {
    const tdList = [];
    const list = document.getElementById('td-section');
    if (list.lastChild === null) {
      tdList.push({
        description: 'test',
        completed: false,
        index: 1,
      });
      list.insertAdjacentHTML(
        'beforeend',
        `<li class="td-item" id="${1}" draggable="true">
                        <input type="checkbox" class="checkbox"/>
                        <p contenteditable="true">${'test'}</p>
                        <i class="delete-line me-2 far fa-trash-alt" id="remove"></i>
                        <i class="drag-line fas fa-ellipsis-v"></i>
                    </li>`,
      );
    } else {
      tdList.push({
        description: 'test',
        completed: false,
        index: Number(list.lastChild.id) + 1,
      });
      list.insertAdjacentHTML(
        'beforeend',
        `<li class="td-item" id="${
          Number(list.lastChild.id) + 1
        }" draggable="true">
                                        <input type="checkbox" class="checkbox"/>
                                        <p contenteditable="true">${'test'}</p>
                                        <i class="delete-line me-2 far fa-trash-alt" id="remove"></i>
                                        <i class="drag-line fas fa-ellipsis-v"></i>
                                    </li>`,
      );
    }
    this.loadLiEvents();

    status.saveStorage();
  };

  clearCompleted = () => {
    const itemToRemove = document.querySelectorAll('.td-item');
    const item = Array.prototype.slice.call(itemToRemove);
    const checked = item.filter((item) => !item.firstChild.nextSibling.checked);
    const newList = [];
    checked.forEach((element, index) => {
      newList.push({
        description: checked[index].childNodes[3].innerText,
        completed: false,
        index: index + 1,
      });
    });
    localStorage.setItem('ToDoList', JSON.stringify(newList));
    status.populate();
    this.loadLiEvents();
  };

  editText = (e) => {
    const tdListStored = JSON.parse(localStorage.getItem('ToDoList'));
    if (e.key === 'Enter') {
      e.preventDefault();
      tdListStored[e.target.parentNode.id - 1].description = e.target.innerText;
      status.saveStorage();
    }
  };

  removeLine = () => {
    const tdListStored = JSON.parse(localStorage.getItem('ToDoList'));
    const len = tdListStored.length;
    const htmlItems = document.querySelectorAll('.td-item');
    for (let i = 0; i < len; i += 1) {
      if (Number(htmlItems[i].id) === tdListStored[0].index) {
        htmlItems[i].remove();
      }
    }
    status.saveStorage();
    status.populate();
    this.loadLiEvents();
  };

  loadLiEvents = () => {
    const draggables = document.querySelectorAll('.td-item');
    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      });

      draggable.addEventListener('keypress', this.editText);
    });

    const rmvLine = document.querySelectorAll('.delete-line');
    rmvLine.forEach((rmv) => {
      rmv.addEventListener('click', this.removeLine);
    });
  };
}
