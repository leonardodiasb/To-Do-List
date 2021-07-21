/**
 * @jest-environment jsdom
 */
jest.mock('./addrm');
import AddRm from './addrm.js';

describe('Testing adding and deleting <li> in the HTML', () => {
    test('Add <li> to <ul> test', () => {
        document.body.innerHTML =
        '<div>' +
        '  <ul id="td-section"></ul>' +
        '</div>';
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
