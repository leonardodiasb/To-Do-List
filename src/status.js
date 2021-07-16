import tdList from './index.js'

export default class Status {
    validation(e) {
        const itemIndex = e.target.parentNode.id;
        if (tdList[itemIndex].completed) {
            tdList[itemIndex].completed = false;
        } else {
            tdList[itemIndex].completed = true;
        }
        this.saveStorage();
    }
    saveStorage() {
        localStorage.setItem('ToDoList', JSON.stringify(tdList));
    }
}