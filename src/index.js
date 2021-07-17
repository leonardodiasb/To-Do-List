import './style.css';
import Icon from './images/enter-icon.png';
import Status from './status.js';
import DragDropSort from './drag.js';
import AddRm from './addrm.js';

const list = document.getElementById('td-section');

const inputLine = document.getElementById('input-line');
inputLine.insertAdjacentHTML('beforeend', `<img src="${Icon}" alt="enter icon" class="enter-icon">`);

const status = new Status();
document.addEventListener('DOMContentLoaded', status.populate);

list.addEventListener('change', (e) => {
  if (e.target.classList.contains('checkbox')) {
    status.validation(e);
  }
});

const addrm = new AddRm();
function loadLiEvents() {
  const draggables = document.querySelectorAll('.td-item');
  const drag = new DragDropSort();
  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });

    draggable.addEventListener('keypress', addrm.editText);
  });

  const rmvLine = document.querySelectorAll('.delete-line');
  rmvLine.forEach((rmv) => {
    rmv.addEventListener('click', addrm.removeLine);
  });

  document.addEventListener('dragover', drag.dragOver);

  document.addEventListener('drop', drag.dropSort);
}

document.addEventListener('DOMContentLoaded', loadLiEvents);

const inpt = document.getElementById('inpt');
inpt.addEventListener('keypress', addrm.addToList);
const rmvBtn = document.getElementById('remove-btn');
rmvBtn.addEventListener('click', addrm.clearCompleted);
