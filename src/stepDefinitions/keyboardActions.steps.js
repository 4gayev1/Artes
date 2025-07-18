const { When } = require("../helper/imports/commons");
const { keyboard, frame } = require("../helper/stepFunctions/exporter");

// User presses a key on a specific selector
When("User presses {string} on {string}", async function (key, selector) {
  await keyboard.press(selector, key);
});

// User presses keys sequentially on a specific selector
When(
  "User types {string} by hand in {string}",
  async function (keys, selector) {
    await keyboard.pressSequentially(selector, keys);
  },
);

When(
  "User types {string} by hand in {int} th of {string}",
  async (text, order, elements) => {
    const nthElement = await frame.nth(elements, order);
    await nthElement.pressSequentially(text);
  },
);

// User presses keys sequentially with a delay on a specific selector
When(
  "User types {string} by hand with delay {int} in {string}",
  async function (keys, delay, selector) {
    await keyboard.pressSequentiallyDelay(selector, keys, delay);
  },
);

// User fills a value into a specific selector
When("User types {string} in {string}", async function (value, selector) {
  await keyboard.fill(selector, value);
});

When(
  "User types {string} in {int} th of {string}",
  async (text, order, elements) => {
    const nthElement = await frame.nth(elements, order);
    await nthElement.fill(text);
  },
);

When(
  "User types {string} in multiple {string}",
  async function (value, selectors) {
    await keyboard.multipleElementFill(selectors, value);
  },
);

// User clears the input of a specific selector
When("User clears {string}", async function (selector) {
  await keyboard.clear(selector);
});

// User selects text in a specific selector
When("User selects {string} text", async function (text) {
  await keyboard.selectText(text);
});

// User sets input files for a specific selector
When(
  "User sets input files {string} for {string}",
  async function (files, selector) {
    const fileArray = files.split(","); // Assuming files are comma-separated
    await keyboard.setInputFiles(selector, fileArray);
  },
);

// User presses a key down
When("User holds down {string}", async function (key) {
  await keyboard.keyDown(key);
});

// User releases a key
When("User releases {string}", async function (key) {
  await keyboard.keyUp(key);
});

// User inserts text
When("User inserts text {string}", async function (text) {
  await keyboard.insertText(text);
});

// User presses a key
When("User presses {string}", async function (key) {
  await keyboard.keyboardPress(key);
});

// User types a key with a delay
When("User types {string} with delay {int}", async function (key, delay) {
  await keyboard.keyboardType(key, delay);
});
