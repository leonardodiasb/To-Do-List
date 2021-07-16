import './style.css';
// import Icon from './images/enter-icon.png';
import Status from './status.js';
import DragDropSort from './drag.js';
import AddRm from './addrm.js';

// const tdListStored = JSON.parse(localStorage.getItem('ToDoList'));
// let tdList = tdListStored;
// if (tdList === null) {
//   tdList = [
//     { description: 'complete To Do List project', completed: true, index: '0' },
//     { description: 'wash the dishes', completed: true, index: '1' },
//     { description: 'rest', completed: true, index: '2' }];
// }
// localStorage.setItem('ToDoList', JSON.stringify(tdList));

const list = document.getElementById('td-section');
// const inputLine = document.getElementById('input-line');

// function populate() {
//   inputLine.insertAdjacentHTML('beforeend', `<img src="${Icon}" alt="enter icon" class="enter-icon">`);
//   for (let i = 0; i < tdList.length; i += 1) {
//     if (tdList[i].completed) {
//       list.insertAdjacentHTML('beforeend',
//         `<div class="td-item" id="${tdList[i].index}" draggable="true">
//             <input type="checkbox" class="checkbox" checked="checked"/>
//             <p>${tdList[i].description}</p>
//             <i class="delete-line fas fa-ellipsis-v"></i>
//         </div>`);
//     } else {
//       list.insertAdjacentHTML('beforeend',
//         `<div class="td-item" id="${tdList[i].index}" draggable="true">
//             <input type="checkbox" class="checkbox"/>
//             <p>${tdList[i].description}</p>
//             <i class="delete-line fas fa-ellipsis-v"></i>
//         </div>`);
//     }
//   }
// }

const status = new Status();
document.addEventListener('DOMContentLoaded', status.populate);

list.addEventListener('change', (e) => {
  if (e.target.classList.contains('checkbox')) {
    status.validation(e);
  }
});

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
  });
  
  document.addEventListener('dragover', drag.dragOver);
  
  document.addEventListener('drop', drag.dropSort);
}

document.addEventListener('DOMContentLoaded', loadLiEvents);

const addrm = new AddRm();
const inpt = document.getElementById('inpt');
inpt.addEventListener('keypress', addrm.addToList);
const rmvBtn = document.getElementById('remove-btn');
rmvBtn.addEventListener('click', addrm.clearCompleted)