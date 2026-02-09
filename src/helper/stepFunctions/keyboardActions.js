const { element, resolveVariable } = require("../imports/commons");

const keyboard = {
  press: async (selector, key, options) => {
    options = options ?? {};

    key = await resolveVariable(key);

    await element(selector).press(key, options);
  },
  pressSequentially: async (selector, keys, options) => {
    options = options ?? {};

    keys = await resolveVariable(keys);

    await element(selector).pressSequentially(keys, options);
  },
  fill: async (selector, value, options) => {
    options = options ?? {};

    value = await resolveVariable(value);

    value !== "" ? await element(selector).fill(value, options) : "";
  },
  keyDown: async (selector, key, options) => {
    options = options ?? {};

    key = await resolveVariable(key);

    await element(selector).down(key, options);
  },
  keyUp: async (selector, key, options) => {
    options = options ?? {};

    key = await resolveVariable(key);

    await element(selector).up(key, options);
  },
  insertText: async (selector, text, options) => {
    options = options ?? {};

    text = await resolveVariable(text);

    await element(selector).insertText(text, options);
  },
  clear: async (selector, options) => {
    options = options ?? {};

    await element(selector).clear(options);
  },
  selectText: async (selector, options) => {
    options = options ?? {};

    await element(selector).selectText(options);
  },
  setInputFiles: async (selector, files, options) => {
    options = options ?? {};

    files = await resolveVariable(files);
    await element(selector).setInputFiles(files, options);
  },
};

module.exports = {
  keyboard,
};
