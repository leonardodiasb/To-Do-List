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
}