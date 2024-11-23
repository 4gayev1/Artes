const { element } = require("../imports/commons");

const elementInteractions = {
  isChecked: async (selector) => {
    return await element(selector).isChecked();
  },
  isDisabled: async (selector) => {
    return await element(selector).isDisabled();
  },
  isEditable: async (selector) => {
    return await element(selector).isEditable();
  },
  isEnabled: async (selector) => {
    return await element(selector).isEnabled();
  },
  isHidden: async (selector) => {
    return await element(selector).isHidden();
  },
  isVisible: async (selector) => {
    return await element(selector).isVisible();
  },
  getAttribute: async (selector, attribute) => {
    return await element(selector).getAttribute(attribute);
  },
  innerHTML: async (selector) => {
    return await element(selector).innerHTML();
  },
  innerText: async (selector) => {
    return await element(selector).innerText();
  },
  textContent: async (selector) => {
    return await element(selector).textContent();
  },
};

module.exports = {
  elementInteractions,
};
