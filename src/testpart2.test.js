/**
 * @jest-environment jsdom
 */
import { expect } from "@jest/globals";
import AddRm from "./addrm.js";
import Status from "./status.js";
import DragDropSort from "./drag.js";

jest.mock("./addrm");
jest.mock("./status");
jest.mock("./drag");

describe("Edit test", () => {
  test("edit test", () => {
    document.body.innerHTML = `<div>
            <ul id="td-section">
            </ul>
        </div>`;
    const addrm = new AddRm();
    addrm.addToList();
    addrm.editText();
    var text =
      document.querySelector(".td-item").firstChild.nextSibling.nextSibling
        .nextSibling.innerHTML;
    const localStorageArray = JSON.parse(localStorage.getItem("ToDoList"));
    expect(localStorageArray[0].description).toBe("new text");
    expect(text).toBe("new text");
  });
});

describe("'Completed' status test", () => {
  test("test completed status", () => {
    const status = new Status();
    var localStorageArray = JSON.parse(localStorage.getItem("ToDoList"));
    expect(localStorageArray[0].completed).toBeFalsy();
    status.validation();
    var localStorageArray = JSON.parse(localStorage.getItem("ToDoList"));
    expect(localStorageArray[0].completed).toBeTruthy();
  });
});

describe("Drag test", () => {
  test("drag test", () => {
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
        var localStorageArray = JSON.parse(localStorage.getItem("ToDoList"));
        expect(localStorageArray[0].description).toBe('Walk the dog');
        expect(localStorageArray[1].description).toBe('Wash dishes');
        const dds = new DragDropSort();
        dds.dragOver();
        status.saveStorage();
        var localStorageArray = JSON.parse(localStorage.getItem("ToDoList"));
        expect(localStorageArray[0].description).toBe('Wash dishes');
        expect(localStorageArray[1].description).toBe('Walk the dog');
        console.log(localStorageArray);
  });
});

describe('Clear all completed test', () => {
    test('Clear all completed test', () => {
        const addrm = new AddRm();
        var localStorageArray = JSON.parse(localStorage.getItem("ToDoList"));
        expect(localStorageArray).toHaveLength(3);
        addrm.clearCompleted();
        var localStorageArray = JSON.parse(localStorage.getItem("ToDoList"));
        expect(localStorageArray).toHaveLength(2);
    })
})