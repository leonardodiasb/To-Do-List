/**
 * @jest-environment jsdom
 */
 import { expect } from '@jest/globals';
import AddRm from './addrm.js';
 import Status from './status.js';

 jest.mock('./addrm');
 jest.mock('./status');
 
 describe('Edit test', () => {
     test('edit test', () => {
        document.body.innerHTML = `<div>
            <ul id="td-section">
            </ul>
        </div>`;
        const addrm = new AddRm();
        addrm.addToList();
        addrm.editText();
        var text = document.querySelector('.td-item').firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
        const localStorageArray = JSON.parse(localStorage.getItem('ToDoList'));
        expect(localStorageArray[0].description).toBe('new text');
        expect(text).toBe('new text');
     });
 });

 describe("'Completed' status test", () => {
     test('test completed status', () => {
        const status = new Status();
        var localStorageArray = JSON.parse(localStorage.getItem('ToDoList'));
        expect(localStorageArray[0].completed).toBeFalsy();
        status.validation();
        var localStorageArray = JSON.parse(localStorage.getItem('ToDoList'));
        expect(localStorageArray[0].completed).toBeTruthy();
     });
 });