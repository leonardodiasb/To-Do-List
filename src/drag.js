import tdList from './index.js'
import Status from './status.js'

const container = document.querySelector('#td-section');

export default class DragDropSort {
    dragOver(e) {
        e.preventDefault();
        const draggable = document.querySelector('.dragging');
        const draggableElements = [...container.querySelectorAll('.td-item:not(.dragging)')]
        const afterElement = draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = e.clientY - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
              return { offset: offset, element: child }
            } else {
              return closest;
            }
          }, { offset: Number.NEGATIVE_INFINITY }).element;
        if (afterElement == null) {
        container.appendChild(draggable);
        } else {
        container.insertBefore(draggable, afterElement);
        }
    }

    dropSort(e) {
        e.preventDefault();
        const array = e.target.parentNode.parentNode.childNodes;
        const len = array.length;
        for (var h = 0; h < len; h+=1) {
          array[h].id = h;
          for (var y = 0; y < len; y += 1) {
            if (array[h].firstChild.nextSibling.nextSibling.nextSibling.innerHTML == tdList[y].description) {
              tdList[y].index = array[h].id
            }
          }
        };
        tdList.sort(function(x,y) {
          return x.index - y.index;
        });
        const status = new Status;
        status.saveStorage();
    };
    
}