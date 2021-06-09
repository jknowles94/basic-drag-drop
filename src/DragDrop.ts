export class DragDrop {
  draggables: NodeListOf<HTMLElement>;
  container: HTMLElement | null;

  constructor(draggables: string, container: string) {
    this.draggables = document.querySelectorAll<HTMLDivElement>(`.${draggables}`);
    this.container = document.getElementById(container);

    this.draggables.forEach(element => {
      element.addEventListener('dragstart', () => {
        element.classList.add('dragging');
      });
      element.addEventListener('dragend', () => {
        element.classList.remove('dragging');
      })
    });
    
    this.container?.addEventListener('dragover', (e) => {
      e.preventDefault();
      const draggable:HTMLDivElement | null = document.querySelector('.dragging');
      const afterElement = this.getDragAfterElement(this.container , e.clientY);
      if(draggable) {
        if(afterElement === null) {
          this.container?.appendChild(draggable);
        } else {
          this.container?.insertBefore(draggable, afterElement);
        }
      }
    })
  }

  
  getDragAfterElement(container: any, y: number) {
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
}