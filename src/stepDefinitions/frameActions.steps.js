const { When } = require("../helper/imports/commons");
const { frame } = require("../helper/stepFunctions/exporter");

// User takes a screenshot of a specific selector
When("User takes a screenshot of {string}", async function (selector) {
  await frame.screenshot(selector);
});

// User gets the content frame of a specific selector
When("User gets the content frame of {string}", async function (selector) {
  await frame.contentFrame(selector);
});

// User gets the frame locator of a specific selector
When("User gets the frame locator of {string}", async function (selector) {
  await frame.frameLocator(selector);
});

// User gets the nth element of a specific selector
When(
  "User gets the {int} th element of {string}",
  async function (index, selector) {
    await frame.nth(selector, index);
  },
);

// User gets the first element of a specific selector
When("User gets the first element of {string}", async function (selector) {
  await frame.first(selector);
});

// User gets the last element of a specific selector
When("User gets the last element of {string}", async function (selector) {
  await frame.last(selector);
});

// User filters elements of a specific selector
When(
  "User filters elements of {string} with filter {string}",
  async function (selector, filter) {
    await frame.filter(selector, filter);
  },
);

// User counts the number of elements of a specific selector
When("User counts the elements of {string}", async function (selector) {
  await frame.count(selector);
});

// User gets an element by its alt text
When("User gets the element with alt text {string}", async function (text) {
  await frame.getByAltText(text);
});

// User gets an element by its label
When("User gets the element with label {string}", async function (label) {
  await frame.getByLabel(label);
});

// User gets an element by its placeholder
When(
  "User gets the element with placeholder {string}",
  async function (placeholder) {
    await frame.getByPlaceholder(placeholder);
  },
);

// User gets an element by its role
When("User gets the element with role {string}", async function (role) {
  await frame.getByRole(role);
});

// User gets an element by its testId
When("User gets the element with testId {string}", async function (testId) {
  await frame.getByTestId(testId);
});
