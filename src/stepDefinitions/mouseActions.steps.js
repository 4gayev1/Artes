const { When } = require("../helper/imports/commons");
const { mouse, frame } = require("../helper/stepFunctions/exporter");

// User clicks on a selector
When("User clicks {string}", async function (selector) {
  await mouse.click(selector);
});

When("User clicks last of {string}", async (selector) => {
  const elementCount = await frame.count(selector);
  const lastElement = await frame.nth(selector, elementCount);
  await mouse.click(lastElement);
});

When("User clicks {int} th of {string}", async (order, elements) => {
  const nthElement = await frame.nth(elements, order);
  await nthElement.click();
});

When("User clicks multiple {string}", async (elements) => {
  await mouse.multipleElementClick(elements);
});

// User clicks on a selector with force
When("User clicks {string} with force", async function (selector) {
  await mouse.click(selector, true);
});

// User clicks on a selector at a specific position
When(
  "User clicks {string} at {int}, {int} position",
  async function (selector, x, y) {
    await mouse.clickPosition(selector, x, y);
  },
);

// User clicks on a selector at a specific position with force
When(
  "User clicks {string} at {int}, {int} position with force",
  async function (selector, x, y) {
    await mouse.clickPosition(selector, x, y, true);
  },
);

// User clicks at specific coordinates
When("User clicks at {int}, {int} coordinates", async function (x, y) {
  await mouse.mouseClickPosition(x, y);
});

// User clicks at specific coordinates with click count and delay
When(
  "User clicks at {int}, {int} coordinates with click count {int} and delay {int}",
  async function (x, y, clickCount, delay) {
    await mouse.mouseClickPosition(x, y, clickCount, delay);
  },
);

// User clicks at specific coordinates with force
When(
  "User clicks at {int}, {int} coordinates with force",
  async function (x, y) {
    await mouse.mouseClickPosition(x, y, 1, 0, true); // Defaulting clickCount and delay
  },
);

// User clicks on a selector with a specific mouse button
When(
  "User clicks {string} with button {string}",
  async function (selector, button) {
    await mouse.clickByBtn(selector, button);
  },
);

// User clicks on a selector with a specific mouse button and force
When(
  "User clicks {string} with button {string} and force",
  async function (selector, button) {
    await mouse.clickByBtn(selector, button, true);
  },
);

// User double clicks on a selector
When("User double clicks {string}", async function (selector) {
  await mouse.doubleClick(selector);
});

When("User double clicks multiple {string}", async (elements) => {
  await mouse.multipleElementDoubleClick(elements);
});

// User double clicks on a selector with force
When("User double clicks {string} with force", async function (selector) {
  await mouse.doubleClick(selector, true);
});

// User double clicks on a selector at a specific position
When(
  "User double clicks {string} at {int}, {int} position",
  async function (selector, x, y) {
    await mouse.doubleClickPosition(selector, x, y);
  },
);

// User double clicks on a selector at a specific position with force
When(
  "User double clicks {string} at {int}, {int} position with force",
  async function (selector, x, y) {
    await mouse.doubleClickPosition(selector, x, y, true);
  },
);

// User double clicks at specific coordinates
When("User double clicks at {int}, {int} coordinates", async function (x, y) {
  await mouse.mouseDoubleClickPosition(x, y);
});

// User double clicks at specific coordinates with click count and delay
When(
  "User double clicks at {int}, {int}  coordinates with click count {int} and delay {int}",
  async function (x, y, clickCount, delay) {
    await mouse.mouseDoubleClickPosition(x, y, clickCount, delay);
  },
);

// User double clicks at specific coordinates with force
When(
  "User double clicks at {int}, {int} coordinates  with force",
  async function (x, y) {
    await mouse.mouseDoubleClickPosition(x, y, 1, 0, true); // Defaulting clickCount and delay
  },
);

// User moves the mouse to specific coordinates
When("User moves to {int}, {int} coordinates", async function (x, y) {
  await mouse.move(x, y);
});

// User scrolls the mouse wheel at specific coordinates
When(
  "User scrolls the mouse wheel at {int}, {int} coordinates",
  async function (x, y) {
    await mouse.wheel(x, y);
  },
);

// User hovers over a selector
When("User hovers over {string}", async function (selector) {
  await mouse.hover(selector);
});

// User hovers over a selector with force
When("User hovers over {string} with force", async function (selector) {
  await mouse.hover(selector, true);
});

// User hovers over a selector at a specific position
When(
  "User hovers over {string} at {int}, {int} position",
  async function (selector, x, y) {
    await mouse.hoverPosition(selector, x, y);
  },
);

// User hovers over a selector at a specific position with force
When(
  "User hovers over {string} at {int}, {int} position with force",
  async function (selector, x, y) {
    await mouse.hoverPosition(selector, x, y, true);
  },
);

// User focuses on a selector
When("User focuses on {string}", async function (selector) {
  await mouse.focus(selector);
});

// User focuses on a selector with force
When("User focuses on {string} with force", async function (selector) {
  await mouse.focus(selector, true);
});

// User focuses on a selector at a specific position
When(
  "User focuses on {string} at {int}, {int} position",
  async function (selector, x, y) {
    await mouse.focusPosition(selector, x, y);
  },
);

// User focuses on a selector at a specific position with force
When(
  "User focuses on {string} at {int}, {int} position with force",
  async function (selector, x, y) {
    await mouse.focusPosition(selector, x, y, true);
  },
);

// User drags an element from one selector to another
When(
  "User drags {string} to {string}",
  async function (sourceSelector, targetSelector) {
    await mouse.dragAndDrop(sourceSelector, targetSelector);
  },
);

// User drags an element to a specific position
When(
  "User drags {string} to {int}, {int} position",
  async function (sourceSelector, x, y) {
    await mouse.dragAndDropPosition(sourceSelector, x, y);
  },
);

// User selects options by value
When(
  "User selects by value {string} from {string}",
  async function (value, selector) {
    await mouse.selectByValue(selector, value);
  },
);

// User selects an option by text
When(
  "User selects by text {string} from {string}",
  async function (text, selector) {
    await mouse.selectByText(selector, text);
  },
);

// User checks a checkbox or radio button
When("User checks {string}", async function (selector) {
  await mouse.check(selector);
});

When("User checks multiple {string}", async function (selectors) {
  await mouse.multipleElementCheck(selectors);
});

// User unchecks a checkbox or radio button
When("User unchecks {string}", async function (selector) {
  await mouse.uncheck(selector);
});

When("User unchecks multiple {string}", async function (selectors) {
  await mouse.multipleElementUncheck(selectors);
});

// User scrolls into view if needed for a selector
When("User scrolls {string} into view", async function (selector) {
  await mouse.scrollIntoViewIfNeeded(selector);
});
