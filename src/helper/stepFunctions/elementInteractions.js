const { element } = require("../imports/commons");

const elementInteractions = {
  isChecked: async (selector, options) => {
    options = options ?? {};

    return await element(selector).isChecked(options);
  },
  isDisabled: async (selector, options) => {
    options = options ?? {};

    return await element(selector, options).isDisabled(options);
  },
  isEditable: async (selector, options) => {
    options = options ?? {};

    return await element(selector).isEditable(options);
  },
  isEnabled: async (selector, options) => {
    options = options ?? {};

    return await element(selector).isEnabled(options);
  },
  isHidden: async (selector, options) => {
    options = options ?? {};

    return await element(selector).isHidden(options);
  },
  isVisible: async (selector, options) => {
    options = options ?? {};

    return await element(selector).isVisible(options);
  },
  getAttribute: async (selector, attribute, options) => {
    options = options ?? {};

    return await element(selector).getAttribute(attribute, options);
  },
  innerHTML: async (selector, options) => {
    options = options ?? {};

    return await element(selector).innerHTML(options);
  },
  innerText: async (selector, options) => {
    options = options ?? {};

    return await element(selector).innerText(options);
  },
  textContent: async (selector, options) => {
    options = options ?? {};

    return await element(selector).textContent(options);
  },
};

module.exports = {
  elementInteractions,
};
