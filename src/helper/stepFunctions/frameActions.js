const { element, moduleConfig } = require("../imports/commons");
const path = require("path");

const frame = {
  screenshot: async (selector, options) => {
    options = options ?? {};

    return await element(selector).screenshot({
      path: path.join(moduleConfig.projectPath, `${selector}.png`),
    });
  },
  contentFrame: async (selector, options) => {
    options = options ?? {};

    return await element(selector, options).contentFrame(options);
  },
  frameLocator: async (selector, options) => {
    options = options ?? {};

    return await element(selector, options).frameLocator(options);
  },
  nth: async (selector, index) => {
    return await element(selector).nth(index - 1);
  },
  first: async (selector) => {
    return await element(selector).first();
  },
  last: async (selector, options) => {
    options = options ?? {};

    return await element(selector).last(options);
  },
  filter: async (selector, filter, options) => {
    options = options ?? {};

    return await element(selector).filter(filter, options);
  },
  count: async (selector, options) => {
    options = options ?? {};

    return await element(selector).count(options);
  },
  getByAltText: async (text, options) => {
    options = options ?? {};

    return await element(text).getByAltText(options);
  },
  getByLabel: async (label, options) => {
    options = options ?? {};

    return await element(label).getByLabel(options);
  },
  getByPlaceholder: async (placeholder, options) => {
    options = options ?? {};

    return await element(placeholder).getByPlaceholder(options);
  },
  getByRole: async (role, options) => {
    options = options ?? {};

    return await element(role).getByRole(options);
  },
  getByTestId: async (testId, options) => {
    options = options ?? {};

    return await element(testId).getByTestId(options);
  },
};

module.exports = {
  frame,
};
