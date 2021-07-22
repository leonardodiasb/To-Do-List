/**
 * @jest-environment jsdom
 */
import AddRm from './addrm.js';
import Status from './status.js';
import DragDropSort from './drag.js';

jest.mock('./addrm');
jest.mock('./status');
jest.mock('./drag');

describe('Test part 2', () => {
  test("Create a li with 'test' text and then modify to 'new text'", () => {
    document.body.innerHTML = `<div>
            <ul id="td-section">
            </ul>
        </div>`;
    const addrm = new AddRm();
    addrm.addToList();
    addrm.editText();
    const text = document.querySelector('.td-item').firstChild.nextSibling.nextSibling
      .nextSibling.innerHTML;
    const localStorageArray = JSON.parse(localStorage.getItem('ToDoList'));
    expect(localStorageArray[0].description).toBe('new text');
    expect(text).toBe('new text');
  });

  test('Change the status completed from false to true', () => {
    const status = new Status();
    let localStorageArray = JSON.parse(localStorage.getItem('ToDoList'));
    expect(localStorageArray[0].completed).toBeFalsy();
    status.validation();
    localStorageArray = JSON.parse(localStorage.getItem('ToDoList'));
    expect(localStorageArray[0].completed).toBeTruthy();
  });

  test('Drag the first li and drop after the second li', () => {
    const status = new Status();
    document.body.innerHTML = `<div>
            <ul id="td-section">
              <li class="td-item" id='task-1' draggable="true">
                          <input type="checkbox" class="checkbox" checked/>
                          <p contenteditable="true">Walk the dog</p>
                          <i class="delete-line me-2 far fa-trash-alt"></i>
                          <i class="drag-line fas fa-ellipsis-v"></i>
              </li>
              <li class="td-item" id='task-2' draggable="true">
                          <input type="checkbox" class="checkbox"/>
                          <p contenteditable="true">Wash dishes</p>
                          <i class="delete-line me-2 far fa-trash-alt"></i>
                          <i class="drag-line fas fa-ellipsis-v"></i>
              </li>
              <li class="td-item" id='task-3' draggable="true">
                          <input type="checkbox" class="checkbox"/>
                          <p contenteditable="true">Cook the food</p>
                          <i class="delete-line me-2 far fa-trash-alt"></i>
                          <i class="drag-line fas fa-ellipsis-v"></i>
              </li>
            </ul>
        </div>`;
    status.saveStorage();
    let localStorageArray = JSON.parse(localStorage.getItem('ToDoList'));
    expect(localStorageArray[0].description).toBe('Walk the dog');
    expect(localStorageArray[1].description).toBe('Wash dishes');
    const dds = new DragDropSort();
    dds.dragOver();
    status.saveStorage();
    localStorageArray = JSON.parse(localStorage.getItem('ToDoList'));
    expect(localStorageArray[0].description).toBe('Wash dishes');
    expect(localStorageArray[1].description).toBe('Walk the dog');
  });

  test('Clear all completed test using the last test document', () => {
    const addrm = new AddRm();
    let localStorageArray = JSON.parse(localStorage.getItem('ToDoList'));
    expect(localStorageArray).toHaveLength(3);
    addrm.clearCompleted();
    localStorageArray = JSON.parse(localStorage.getItem('ToDoList'));
    expect(localStorageArray).toHaveLength(2);
  });
});
