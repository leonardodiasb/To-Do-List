import Icon from './images/enter-icon.png';

export default class Status {
  validation(e) {
    const tdList = JSON.parse(localStorage.getItem('ToDoList'));
    const itemIndex = e.target.parentNode.id;
    if (tdList[itemIndex].completed) {
      tdList[itemIndex].completed = false;
    } else {
      tdList[itemIndex].completed = true;
    }
    this.saveStorage();
  }

  saveStorage = () => {
    const newList = [];
    const listToStore = document.querySelectorAll('.td-item');
    for (let i = 0; i < listToStore.length; i += 1) {
      newList.push({
        description: listToStore[i].firstChild.nextSibling.nextSibling.nextSibling.innerHTML,
        completed: listToStore[i].firstChild.nextSibling.checked,
        index: i,
      });
    }
    localStorage.setItem('ToDoList', JSON.stringify(newList));
  }
  
  populate = () => {
    const tdListStored = JSON.parse(localStorage.getItem('ToDoList'));
    let tdList = tdListStored;
    const list = document.getElementById('td-section');
    const inputLine = document.getElementById('input-line');
    inputLine.insertAdjacentHTML('beforeend', `<img src="${Icon}" alt="enter icon" class="enter-icon">`);
    list.innerHTML = '';
    for (let i = 0; i < tdList.length; i += 1) {
        if (tdList[i].completed) {
        list.insertAdjacentHTML('beforeend',
            `<div class="td-item" id="${tdList[i].index}" draggable="true">
                <input type="checkbox" class="checkbox" checked="checked"/>
                <p>${tdList[i].description}</p>
                <i class="delete-line fas fa-ellipsis-v"></i>
            </div>`);
        } else {
        list.insertAdjacentHTML('beforeend',
            `<div class="td-item" id="${tdList[i].index}" draggable="true">
                <input type="checkbox" class="checkbox"/>
                <p>${tdList[i].description}</p>
                <i class="delete-line fas fa-ellipsis-v"></i>
            </div>`);
        }
    }
  }
}