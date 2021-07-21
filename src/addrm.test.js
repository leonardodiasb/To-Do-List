/**
 * @jest-environment jsdom
 */
import AddRm from './addrm.js';

jest.mock('./addrm');

describe('Testing adding and deleting <li> in the HTML', () => {
  test('Add <li> to <ul> test', () => {
    document.body.innerHTML = '<div><ul id="td-section"></ul></div>';
    const add = new AddRm();
    add.addToList();
    add.addToList();
    const list = document.querySelectorAll('.td-item');
    expect(list).toHaveLength(2);
  });

  test('Removes first <li> from <ul> test', () => {
    const add = new AddRm();
    add.removeLine();
    add.removeLine();
    const list = document.querySelectorAll('.td-item');
    expect(list).toHaveLength(0);
  });
});

describe('Testing adding and deleting object in LocalStorage', () => {
  test('Add object to localStorage array', () => {
    const add = new AddRm();
    add.addToList();
    add.addToList();
    const localStorageArray = JSON.parse(localStorage.getItem('ToDoList'));
    expect(localStorageArray).toHaveLength(2);
  });

  test('Delete object from localStorage array', () => {
    const add = new AddRm();
    add.removeLine();
    const localStorageArray = JSON.parse(localStorage.getItem('ToDoList'));
    expect(localStorageArray).toHaveLength(1);
  });
});
