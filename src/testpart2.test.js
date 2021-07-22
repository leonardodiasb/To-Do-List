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

describe("'Completed' status test", () => {
  test("test completed status", () => {
    document.body.innerHTML = `<div>
            <ul id="td-section">
              <div class="td-item" id='task-1' draggable="true">
                          <input type="checkbox" class="checkbox"/>
                          <p contenteditable="true">Walk the dog</p>
                          <i class="delete-line me-2 far fa-trash-alt"></i>
                          <i class="drag-line fas fa-ellipsis-v"></i>
              </div>
              <div class="td-item" id='task-2' draggable="true">
                          <input type="checkbox" class="checkbox"/>
                          <p contenteditable="true">Wash dishes</p>
                          <i class="delete-line me-2 far fa-trash-alt"></i>
                          <i class="drag-line fas fa-ellipsis-v"></i>
              </div>
              <div class="td-item" id='task-3' draggable="true">
                          <input type="checkbox" class="checkbox"/>
                          <p contenteditable="true">Cook the food</p>
                          <i class="delete-line me-2 far fa-trash-alt"></i>
                          <i class="drag-line fas fa-ellipsis-v"></i>
              </div>
            </ul>
        </div>`;
  });
});
