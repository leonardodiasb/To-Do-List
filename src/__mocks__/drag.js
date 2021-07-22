import Status from './status.js';

export default class DragDropSort {
  dragOver = () => {
    const container = document.querySelector('#td-section');

    // e.preventDefault();
    const draggable = document.querySelector('#task-1');
    // const draggableElements = [
    //   ...container.querySelectorAll(".td-item:not(.dragging)"),
    // ];
    const afterElement = document.querySelector('#task-3');
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  };

  dropSort = () => {
    // e.preventDefault();
    const array = document.getElementById('td-section').childNodes;
    const len = array.length;
    const tdList = JSON.parse(localStorage.getItem('ToDoList'));
    for (let h = 0; h < len; h += 1) {
      array[h].id = h + 1;
      for (let y = 0; y < len; y += 1) {
        const text = array[h].firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
        if (text === tdList[y].description) {
          tdList[y].index = array[h].id;
        }
      }
    }
    tdList.sort((x, y) => x.index - y.index);
    const status = new Status();
    status.saveStorage();
  };
}
