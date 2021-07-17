import Status from './status.js';
import DragDropSort from './drag.js';

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
                        <p>${event.target.value}</p>
                        <i class="delete-line fas fa-ellipsis-v"></i>
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
                                        <p>${event.target.value}</p>
                                        <i class="delete-line fas fa-ellipsis-v"></i>
                                    </div>`);
      }
      const draggables = document.querySelectorAll('.td-item');
      const drag = new DragDropSort();
      draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', () => {
          draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
          draggable.classList.remove('dragging');
        });
      });

      document.addEventListener('dragover', drag.dragOver);

      document.addEventListener('drop', drag.dropSort);
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
    status.populate();
  }
}