class Tooltip {

  elements = [];
  element;
  callbackMove;
  currentElement;
  elementListeners = [];
  constructor() {
    if (Tooltip._instance) {
      return Tooltip._instance;
    }
    Tooltip._instance = this;
  }

  initialize() {
    this.elements = document.querySelectorAll('[data-tooltip]');

    this.elements.forEach((elem) => {
      const callbackOver = (event) => {
        event.stopPropagation();
        if (this.element) {
          return;
        }

        this.element = this.render(elem.dataset.tooltip);
        this.currentElement = elem;

        this.callbackMove = (event) => {
          this.element.style.left = `${event.clientX + 10}px`;
          this.element.style.top = `${event.clientY + 10}px`;
        };

        elem.addEventListener('pointermove', this.callbackMove);
      };
      elem.addEventListener('pointerover', callbackOver);

      const callbackOut = () => {
        if (this.element) {
          document.body.removeChild(this.element);
          this.element = null;
        }
        if (this.callbackMove) {
          elem.removeEventListener('pointermove', this.callbackMove);
          this.callbackMove = null;
          this.currentElement = null;
        }
      };
      elem.addEventListener('pointerout', callbackOut);

      this.elementListeners.push({
        elem,
        div: this.element,
        pointerover: callbackOver,
        pointerout: callbackOut,
      });
    });
  }

  render(text) {
    const div = document.createElement('this.element');
    div.className = 'tooltip';
    div.innerHTML = text;
    document.body.append(div);
    this.element = div;
    return this.element;
  }

  destroy() {
    this.element = null;
  }
}

export default Tooltip;
