const { element } = require("../imports/commons");
const { frame } = require("../stepFunctions/frameActions");
const mouse = {
  click: async (selector) => {
    await element(selector).click();
  },
  multipleElementClick: async (selectors) => {
    const elementCount = await frame.count(selectors);

    for (let i = 0; i < elementCount; i++) {
      await frame.nth(selectors, i).click();
    }
  },
  forceClick: async (selector) => {
    await element(selector).click({ force: true });
  },
  clickPosition: async (selector, x, y) => {
    await element(selector).click({ position: { x: x, y: y } });
  },
  forceClickPosition: async (selector, x, y) => {
    await element(selector).click({ force: true, position: { x: x, y: y } });
  },
  rightClick: async (selector) => {
    await element(selector).click({ button: "right" });
  },
  multipleElementRightClick: async (elements) => {
    const elementCount = await frame.count(elements);

    for (let i = 0; i < elementCount; i++) {
      await frame.nth(elements, i).click({ button: "right" });
    }
  },
  forceRightClick: async (selector) => {
    await element(selector).click({ force: true, button: "right" });
  },
  leftClick: async (selector) => {
    await element(selector).click({ button: "left" });
  },
  multipleElementLeftClick: async (elements) => {
    const elementCount = await frame.count(elements);

    for (let i = 0; i < elementCount; i++) {
      await frame.nth(elements, i).click({ button: "left" });
    }
  },
  forceLeftClick: async (selector) => {
    await element(selector).click({ force: true, button: "left" });
  },
  doubleClick: async (selector) => {
    await element(selector).dblclick();
  },
  multipleElementDoubleClick: async (elements) => {
    const elementCount = await frame.count(elements);

    for (let i = 0; i < elementCount; i++) {
      await frame.nth(elements, i).dblclick();
    }
  },
  forceDoubleClick: async (selector) => {
    await element(selector).dblclick({ force: true });
  },
  forceDoubleClickPosition: async (selector, x, y) => {
    await element(selector).dblclick({ force: true, position: { x: x, y: y } });
  },
  hover: async (selector) => {
    await element(selector).hover();
  },
  forceHover: async (selector) => {
    await element(selector).hover({ force: true });
  },
  hoverPosition: async (selector, x, y) => {
    await element(selector).hover({ x: x, y: y });
  },
  forceHoverPosition: async (selector, x, y) => {
    await element(selector).hover({ force: true, x: x, y: y });
  },
  focus: async (selector) => {
    await element(selector).focus();
  },
  forceFocus: async (selector) => {
    await element(selector).focus({ force: true });
  },
  focusPosition: async (selector, x, y) => {
    await element(selector).focus({ x: x, y: y });
  },
  forceFocusPosition: async (selector, x, y) => {
    await element(selector).focus({ force: true, x: x, y: y });
  },
  dragAndDrop: async (sourceSelector, targetSelector) => {
    const source = await element(sourceSelector);
    const target = await element(targetSelector);
    await source.dragTo(target);
  },
  dragAndDropPosition: async (sourceSelector, x, y) => {
    await element(sourceSelector).dragTo({ targetPosition: { x: x, y: y } });
  },
  selectByValue: async (selector, value) => {
    const valueArray = value.split(",");
  value !== "" ? await element(selector).selectOption(valueArray) : "";
  },
  selectByText: async (selector, value) => {
   value !== "" ? await element(selector).selectOption(value) : "" ;
  },
  check: async (selector) => {
    await element(selector).check();
  },
  multipleElementCheck: async (selectors) => {
    const elementCount = await frame.count(selectors);

    for (let i = 0; i < elementCount; i++) {
      await frame.nth(selectors, i).check();
    }
  },
  uncheck: async (selector) => {
    await element(selector).uncheck();
  },
  multipleElementUncheck: async (selectors) => {
    const elementCount = await frame.count(selectors);

    for (let i = 0; i < elementCount; i++) {
      await frame.nth(selectors, i).uncheck();
    }
  },
  scrollIntoViewIfNeeded: async (selector) => {
    await element(selector).scrollIntoViewIfNeeded();
  },
};

module.exports = {
  mouse,
};
