const { element, resolveVariable } = require("../imports/commons");

const keyboard = {
  press: async (selector, key) => {
    key = await resolveVariable(key);
    await element(selector).press(key);
  },
  pressSequentially: async (selector, keys) => {
    keys = await resolveVariable(keys);
    await element(selector).pressSequentially(keys);
  },
  pressSequentiallyDelay: async (selector, keys, delay) => {
    keys = await resolveVariable(keys);
    await element(selector).pressSequentially(keys, { delay: delay });
  },
  fill: async (selector, value) => {
    value = await resolveVariable(value);
    value !== "" ? await element(selector).fill(value) : "";
  },
  multipleElementFill: async (selectors, value) => {
    const elementCount = await frame.count(selectors);
    value = await resolveVariable(value);
    for (let i = 0; i < elementCount; i++) {
      await frame.nth(selectors, i).fill(value);
    }
  },
  clear: async (selector) => {
    await element(selector).clear();
  },
  selectText: async (selector) => {
    await element(selector).selectText();
  },
  setInputFiles: async (selector, files) => {
    files = await resolveVariable(files);
    await element(selector).setInputFiles(files);
  },
};

module.exports = {
  keyboard,
};
