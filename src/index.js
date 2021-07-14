import './style.css';

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

function populate() {
  for (let i = 0; i < tdList.length; i += 1) {
    if (tdList[i].completed) {
      list.insertAdjacentHTML('beforeend',
        `<div class="td-item">
            <input type="checkbox" checked>
            <p>${tdList[i].description}</p>
        </div>`);
    } else {
      list.insertAdjacentHTML('beforeend',
        `<div class="td-item">
            <input type="checkbox">
            <p>${tdList[i].description}</p>
        </div>`);
    }
  }
}

document.addEventListener('DOMContentLoaded', populate);