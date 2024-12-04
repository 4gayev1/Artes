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

    const selectorType =
      this.elements?.[element]?.selector?.split("=")[0] ||
      this.elements?.[element]?.split("=")[0] ||
      element?.split("=")[0];
    const selector =
      this.elements?.[element]?.selector?.split("=")[1] ||
      this.elements?.[element]?.split("=")[1] ||
      element?.split("=")[1];

    const locator = [selectorType, selector];
    
    const waitTime = this.elements[element]?.waitTime * 1000 || 0;

    switch (locator[0]) {
      case "xpath":
        return context.page.locator(`xpath=${locator[1]}`);
      case "name":
        return context.page.locator(`[name=${locator[1]}]`);
      case "placeholder":
        return context.page.getByPlaceholder(locator[1]);
      case "text":
        return context.page.getByText(locator[1]);
      case "label":
        return context.page.getByLabel(locator[1]);
      case "role":
        return context.page.getByRole(locator[1]);
      case "alt":
        return context.page.getByAltText(locator[1]);
      case "title":
        return context.page.getByTitle(locator[1]);
      case "testid":
        return context.page.getByTestId(locator[1]);
      default:
        return context.page.locator(locator[0]);
    }
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
  getSelector: Elements.getSelector.bind(Elements),
};
