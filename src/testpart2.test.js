/**
 * @jest-environment jsdom
 */
 import AddRm from './addrm.js';

 jest.mock('./addrm');
 
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
        console.log(localStorageArray);
        expect(localStorageArray[0].description).toBe('new text');
        expect(text).toBe('new text');
     })
 })