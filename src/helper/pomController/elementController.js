const { context } = require("../../hooks/context");

class Elements {
  static elements = {};

  static addElements(elements) {
    this.elements = { ...this.elements, ...elements };
  }

  static getElement(element) {
    if (!context.page) {
      throw new Error("Page context is not initialized.");
    }
    const selector =
      this.elements?.[element]?.selector || this.elements?.[element] || element;
    const waitTime = this.elements[element]?.waitTime * 1000 || 0;
    return context.page.locator(selector);
  }

  static getSelector(element) {
    const selector =
      this.elements?.[element]?.selector || this.elements?.[element] || element;
    return selector;
  }
  
}

module.exports = {
  getElement: Elements.getElement.bind(Elements),
  addElements: Elements.addElements.bind(Elements),
  getSelector: Elements.getSelector.bind(Elements)
};
