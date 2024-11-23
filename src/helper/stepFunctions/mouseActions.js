const { element } = require("../imports/commons");

const mouse = {
  click: async (selector) => {
    await element(selector).click(selector);
  },
  forceClick: async (selector) => {
    await element(selector).click({ force: true });
  },
  clickPosition: async (selector, position) => {
    const [x, y] = position.split(",").map(Number);
    await element(selector).click({ position: { x: x, y: y } });
  },
  forceClickPosition: async (selector, position) => {
    const [x, y] = position.split(",").map(Number);
    await element(selector).click({ force: true, position: { x: x, y: y } });
  },
  rightClick: async (selector) => {
    await element(selector).click({ button: "right" });
  },
  forceRightClick: async (selector) => {
    await element(selector).click({ force: true, button: "right" });
  },
  leftClick: async (selector) => {
    await element(selector).click({ button: "left" });
  },
  forceLeftClick: async (selector) => {
    await element(selector).click({ force: true, button: "left" });
  },
  doubleClick: async (selector) => {
    await element(selector).dblclick();
  },
  forceDoubleClick: async (selector) => {
    await element(selector).dblclick({ force: true });
  },
  forceDoubleClickPosition: async (selector, position) => {
    const [x, y] = position.split(",").map(Number);
    await element(selector).dblclick({ force: true, position: { x: x, y: y } });
  },
  hover: async (selector) => {
    await element(selector).hover();
  },
  forceHover: async (selector) => {
    await element(selector).hover({ force: true });
  },
  hoverPosition: async (selector, position) => {
    const [x, y] = position.split(",").map(Number);
    await element(selector).hover({ x: x, y: y });
  },
  forceHoverPosition: async (selector, position) => {
    const [x, y] = position.split(",").map(Number);
    await element(selector).hover({ force: true, x: x, y: y });
  },
  focus: async (selector) => {
    await element(selector).focus();
  },
  forceFocus: async (selector) => {
    await element(selector).focus({ force: true });
  },
  focusPosition: async (selector, position) => {
    const [x, y] = position.split(",").map(Number);
    await element(selector).focus({ x: x, y: y });
  },
  forceFocusPosition: async (selector, position) => {
    const [x, y] = position.split(",").map(Number);
    await element(selector).focus({ force: true, x: x, y: y });
  },
  dragAndDrop: async (sourceSelector, targetSelector) => {
    const source = await element(sourceSelector);
    const target = await element(targetSelector);
    await source.dragTo(target);
  },
  dragAndDropPosition: async (sourceSelector, position) => {
    const [x, y] = position.split(",").map(Number);
    await element(sourceSelector).dragTo({ targetPosition: { x: x, y: y } });
  },
  selectByValue: async (selector, value) => {
    const valueArray = value.split(",");
    await element(selector).selectOption(valueArray);
  },
  selectByText: async (selector, value) => {
    await element(selector).selectOption(value);
  },
  check: async (selector) => {
    await element(selector).check();
  },
  uncheck: async (selector) => {
    await element(selector).uncheck();
  },
  scrollIntoViewIfNeeded: async (selector) => {
    await element(selector).scrollIntoViewIfNeeded();
  },
};

module.exports = {
  mouse,
};
