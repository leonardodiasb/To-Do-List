export default class Status {
  validation = () => {
    const tdList = JSON.parse(localStorage.getItem('ToDoList'));
    if (tdList[0].completed) {
      tdList[0].completed = false;
    } else {
      tdList[0].completed = true;
    }
    localStorage.setItem('ToDoList', JSON.stringify(tdList));
  };

  saveStorage = () => {
    const newList = [];
    const listToStore = document.querySelectorAll('.td-item');
    for (let i = 0; i < listToStore.length; i += 1) {
      newList.push({
        description:
          listToStore[i].firstChild.nextSibling.nextSibling.nextSibling
            .innerHTML,
        completed: listToStore[i].firstChild.nextSibling.checked,
        index: i + 1,
      });
    }
    localStorage.setItem('ToDoList', JSON.stringify(newList));
  };

  populate = () => {
    const tdListStored = JSON.parse(localStorage.getItem('ToDoList'));
    const tdList = tdListStored;
    const list = document.getElementById('td-section');
    list.innerHTML = '';
    for (let i = 0; i < tdList.length; i += 1) {
      if (tdList[i].completed) {
        list.insertAdjacentHTML(
          'beforeend',
          `<li class="td-item" id="${tdList[i].index}" draggable="true">
                <input type="checkbox" class="checkbox" checked="checked"/>
                <p contenteditable="true">${tdList[i].description}</p>
                <i class="delete-line me-2 far fa-trash-alt" id="remove"></i>
                <i class="drag-line fas fa-ellipsis-v"></i>
            </li>`,
        );
      } else {
        list.insertAdjacentHTML(
          'beforeend',
          `<li class="td-item" id="${tdList[i].index}" draggable="true">
                <input type="checkbox" class="checkbox"/>
                <p contenteditable="true">${tdList[i].description}</p>
                <i class="delete-line me-2 far fa-trash-alt" id="remove"></i>
                <i class="drag-line fas fa-ellipsis-v"></i>
            </li>`,
        );
      }
    }
  };
}
