import Status from './status.js';

const container = document.querySelector('#td-section');

export default class DragDropSort {
  dragOver = (e) => {
    e.preventDefault();
    const draggable = document.querySelector('.dragging');
    const draggableElements = [...container.querySelectorAll('.td-item:not(.dragging)')];
    const afterElement = draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = e.clientY - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  }

  dropSort = (e) => {
    e.preventDefault();
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
  }
}