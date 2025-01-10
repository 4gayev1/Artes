const { element, moduleConfig } = require("../imports/commons");
const path = require("path");

const frame = {
  screenshot: async (selector) => {
    return await element(selector).screenshot({
      path: path.join(moduleConfig.projectPath, `${selector}.png`),
    });
  },
  contentFrame: async (selector) => {
    return await element(selector).contentFrame();
  },
  frameLocator: async (selector) => {
    return await element(selector).frameLocator();
  },
  nth: async (selector, index) => {
    return await element(selector).nth(index - 1);
  },
  first: async (selector) => {
    return await element(selector).first();
  },
  last: async (selector) => {
    return await element(selector).last();
  },
  filter: async (selector, filter) => {
    return await element(selector).filter(filter);
  },
  count: async (selector) => {
    return await element(selector).count();
  },
  getByAltText: async (text) => {
    return await element(text).getByAltText();
  },
  getByLabel: async (label) => {
    return await element(label).getByLabel();
  },
  getByPlaceholder: async (placeholder) => {
    return await element(placeholder).getByPlaceholder();
  },
  getByRole: async (role) => {
    return await element(role).getByRole();
  },
  getByTestId: async (testId) => {
    return await element(testId).getByTestId();
  },
};

module.exports = {
  frame,
};
