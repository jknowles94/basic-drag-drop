
const draggables = document.querySelectorAll<HTMLDivElement>('.draggable');
const container = document.getElementById('scrollable-container');

draggables.forEach(element => {
  element.addEventListener('dragstart', () => {
    element.classList.add('dragging');
  });
  element.addEventListener('dragend', () => {
    element.classList.remove('dragging');
  })
});

container?.addEventListener('dragover', (e) => {
  e.preventDefault();
  const draggable:HTMLDivElement | null = document.querySelector('.dragging');
  const afterElement = getDragAfterElement(container , e.clientY);
  if(draggable) {
    if(afterElement === null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  }
})

function getDragAfterElement(container: any, y: number) {
  const dragElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  return dragElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = (y - box.top) - (box.height / 2);
    if(offset < 0 && offset > closest.offset) {
      return {offset: offset, element: child};
    } else {
      return closest;
    }
  }, {offset: Number.NEGATIVE_INFINITY}).element;
}