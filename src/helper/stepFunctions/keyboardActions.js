const { element } = require("../imports/commons");

const keyboard = {
  press: async (selector, key) => {
    await element(selector).press(key);
  },
  pressSequentially: async (selector, keys) => {
    await element(selector).pressSequentially(keys);
  },
  pressSequentiallyDelay: async (selector, keys, delay) => {
    await element(selector).pressSequentially(keys, { delay: delay });
  },
  fill: async (selector, value) => {
    await element(selector).fill(value);
  },
  clear: async (selector) => {
    await element(selector).clear();
  },
  selectText: async (selector) => {
    await element(selector).selectText();
  },
  setInputFiles: async (selector, files) => {
    await element(selector).setInputFiles(files);
  },
};

module.exports = {
  keyboard,
};
