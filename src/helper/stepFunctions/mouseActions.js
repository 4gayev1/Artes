const path = require("path");
const {
  element,
  context,
  selector,
  moduleConfig,
} = require("../imports/commons");

const mouse = {
  click: async (selector, options) => {
    options = options ?? {};

    await element(selector).click(options);
  },
  doubleClick: async (selector, options) => {
    options = options ?? {};

    await element(selector).dblclick(options);
  },
  hover: async (selector, options) => {
    options = options ?? {};

    await element(selector).hover(options);
  },
  focus: async (selector, options) => {
    options = options ?? {};

    await element(selector).focus(options);
  },
  dragAndDrop: async (sourceSelector, targetSelector, options) => {
    options = options ?? {};

    const source = await element(sourceSelector);
    const target = await element(targetSelector);
    await source.dragTo(target, options);
  },
  selectByValue: async (selector, value, options) => {
    options = options ?? {};

    value !== "" ? await element(selector).selectOption(value, options) : "";
  },
  selectByText: async (selector, text, options) => {
    options = options ?? {};

    text !== "" ? await element(selector).selectOption(text, options) : "";
  },
  check: async (selector, options) => {
    options = options ?? {};

    await element(selector).check(options);
  },
  uncheck: async (selector, options) => {
    options = options ?? {};

    await element(selector).uncheck(options);
  },
  scrollIntoViewIfNeeded: async (selector, options) => {
    options = options ?? {};

    await element(selector).scrollIntoViewIfNeeded(options);
  },
  upload: async (filePath, fileInput, options) => {
    options = options ?? {};

    const file = selector(filePath);
    const fileChooserPromise = context.page.waitForEvent("filechooser");
    await element(fileInput).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(
      path.join(moduleConfig.projectPath, file),
      options,
    );
  },
};

module.exports = {
  mouse,
};
