import './style.css';
import Icon from './images/enter-icon.png';

const tdList = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'complete To Do List project',
    completed: true,
    index: 1,
  },
];

const list = document.getElementById('td-section');
const inputLine = document.getElementById('input-line');

function populate() {
  inputLine.insertAdjacentHTML('beforeend', `<img src="${Icon}" alt="enter icon" class="enter-icon">`);
  for (let i = 0; i < tdList.length; i += 1) {
    if (tdList[i].completed) {
      list.insertAdjacentHTML('beforeend',
        `<div class="td-item">
            <input type="checkbox" checked>
            <p>${tdList[i].description}</p>
            <i class="delete-line fas fa-ellipsis-v"></i>
        </div>`);
    } else {
      list.insertAdjacentHTML('beforeend',
        `<div class="td-item">
            <input type="checkbox">
            <p>${tdList[i].description}</p>
            <i class="delete-line fas fa-ellipsis-v"></i>
        </div>`);
    }
  }
}

document.addEventListener('DOMContentLoaded', populate);