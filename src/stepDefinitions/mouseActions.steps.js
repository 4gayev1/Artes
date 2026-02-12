const {
  When,
  element,
  selector,
  context,
 resolveVariable
} = require("../helper/imports/commons");
const { mouse, frame, page } = require("../helper/stepFunctions/exporter");

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
  const elementCount = await frame.count(elements);

  for (let i = 0; i < elementCount; i++) {
    await frame.nth(elements, i).click();
  }
});

// User clicks on a selector with force
When("User clicks {string} with force", async function (selector) {
  await mouse.click(selector, { force: true });
});

// User clicks on a selector at a specific position
When(
  "User clicks {string} at {int}, {int} position",
  async function (selector, x, y) {
    x = await resolveVariable(x)
    y = await resolveVariable(y)
    await mouse.click(selector, { position: { x: x, y: y } });
  },
);

// User clicks on a selector at a specific position with force
When(
  "User clicks {string} at {int}, {int} position with force",
  async function (selector, x, y) {
    x = await resolveVariable(x)
    y = await resolveVariable(y)
    await mouse.click(selector, { force: true, position: { x: x, y: y } });
  },
);

// User clicks at specific coordinates
When("User clicks at {int}, {int} coordinates", async function (x, y) {
  x = await resolveVariable(x)
  y = await resolveVariable(y)
  await context.page.click({ position: { x: x, y: y } });
});

// User clicks at specific coordinates with click count and delay
When(
  "User clicks at {int}, {int} coordinates with click count {int} and delay {int}",
  async function (x, y, clickCount, delay) {
    x = await resolveVariable(x)
    y = await resolveVariable(y)
    await context.page.click({
      position: { x: x, y: y },
      clickCount: clickCount,
      delay: delay,
    });
  },
);

// User clicks at specific coordinates with force
When(
  "User clicks at {int}, {int} coordinates with force",
  async function (x, y) {
    x = await resolveVariable(x)
    y = await resolveVariable(y)
    context.page.click({ position: { x: x, y: y }, force: true });
  },
);

// User clicks on a selector with a specific mouse button
When(
  "User clicks {string} with {string} button",
  async function (selector, button) {
    await mouse.click(selector, { button: button });
  },
);

// User clicks on a selector with a specific mouse button and force
When(
  "User clicks {string} with {string} button and force",
  async function (selector, button) {
    await mouse.click(selector, { button: button, force: true });
  },
);

When(
  "User clicks multiple {string} with {string} button",
  async function (selector, button) {
    const elementCount = await frame.count(selector);

    for (let i = 0; i < elementCount; i++) {
      await frame.nth(selector, i).click({ button: button });
    }
  },
);

// User double clicks on a selector
When("User double clicks {string}", async function (selector) {
  await mouse.doubleClick(selector);
});

When(
  "User double clicks {string} with {string} button",
  async function (selector, button) {
    await mouse.doubleClick(selector, { button: button });
  },
);

When(
  "User double clicks {string} with {string} button and force",
  async function (selector, button) {
    await mouse.doubleClick(selector, { button: button, force: true });
  },
);

When("User double clicks multiple {string}", async (elements) => {
  const elementCount = await frame.count(elements);

  for (let i = 0; i < elementCount; i++) {
    await frame.nth(elements, i).dblclick();
  }
});

// User double clicks on a selector with force
When("User double clicks {string} with force", async function (selector) {
  await mouse.doubleClick(selector, { force: true });
});

// User double clicks on a selector at a specific position
When(
  "User double clicks {string} at {int}, {int} position",
  async function (selector, x, y) {
    x = await resolveVariable(x)
    y = await resolveVariable(y)
    await mouse.doubleClick(selector, { position: { x: x, y: y } });
  },
);

// User double clicks on a selector at a specific position with force
When(
  "User double clicks {string} at {int}, {int} position with force",
  async function (selector, x, y) {
    x = await resolveVariable(x)
    y = await resolveVariable(y)
    await mouse.doubleClick(selector, {
      position: { x: x, y: y },
      force: true,
    });
  },
);

// User double clicks at specific coordinates
When("User double clicks at {int}, {int} coordinates", async function (x, y) {
  x = await resolveVariable(x)
  y = await resolveVariable(y)
  await context.page.doubleClick({ position: { x: x, y: y } });
});

// User double clicks at specific coordinates with click count and delay
When(
  "User double clicks at {int}, {int}  coordinates with click count {int} and delay {int}",
  async function (x, y, clickCount, delay) {
    x = await resolveVariable(x)
    y = await resolveVariable(y)
    await context.page.doubleClick({
      position: { x: x, y: y },
      clickCount: clickCount,
      delay: delay,
    });
  },
);

// User double clicks at specific coordinates with force
When(
  "User double clicks at {int}, {int} coordinates  with force",
  async function (x, y) {
    x = await resolveVariable(x)
    y = await resolveVariable(y)
    await context.page.doubleClick({ position: { x: x, y: y }, force: true });
  },
);

// User moves the mouse to specific coordinates
When("User moves to {int}, {int} coordinates", async function (x, y) {
  x = await resolveVariable(x)
  y = await resolveVariable(y)
  await context.page.move({ position: { x: x, y: y } });
});

// User scrolls the mouse wheel at specific coordinates
When(
  "User scrolls the mouse wheel at {int}, {int} coordinates",
  async function (x, y) {
    x = await resolveVariable(x)
    y = await resolveVariable(y)
    await context.page.wheel({ position: { x: x, y: y } });
  },
);

// User hovers over a selector
When("User hovers over {string}", async function (selector) {
  await mouse.hover(selector);
});

// User hovers over a selector with force
When("User hovers over {string} with force", async function (selector) {
  await mouse.hover(selector, { force: true });
});

// User hovers over a selector at a specific position
When(
  "User hovers over {string} at {int}, {int} position",
  async function (selector, x, y) {
    x = await resolveVariable(x)
    y = await resolveVariable(y)
    await mouse.hover(selector, { position: { x: x, y: y } });
  },
);

// User hovers over a selector at a specific position with force
When(
  "User hovers over {string} at {int}, {int} position with force",
  async function (selector, x, y) {
    x = await resolveVariable(x)
    y = await resolveVariable(y)
    await mouse.hover(selector, { position: { x: x, y: y }, force: true });
  },
);

// User focuses on a selector
When("User focuses on {string}", async function (selector) {
  await mouse.focus(selector);
});

// User focuses on a selector with force
When("User focuses on {string} with force", async function (selector) {
  await mouse.focus(selector, { force: true });
});

// User focuses on a selector at a specific position
When(
  "User focuses on {string} at {int}, {int} position",
  async function (selector, x, y) {
    x = await resolveVariable(x)
    y = await resolveVariable(y)
    await mouse.focus(selector, { position: { x: x, y: y } });
  },
);

// User focuses on a selector at a specific position with force
When(
  "User focuses on {string} at {int}, {int} position with force",
  async function (selector, x, y) {
    x = await resolveVariable(x)
    y = await resolveVariable(y)
    await mouse.focus(selector, { position: { x: x, y: y }, force: true });
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
    x = await resolveVariable(x)
    y = await resolveVariable(y)
    await mouse.dragAndDrop(sourceSelector, { position: { x: x, y: y } });
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
  const elementCount = await frame.count(selectors);

  for (let i = 0; i < elementCount; i++) {
    await frame.nth(selectors, i).check();
  }
});

// User unchecks a checkbox or radio button
When("User unchecks {string}", async function (selector) {
  await mouse.uncheck(selector);
});

When("User unchecks multiple {string}", async function (selectors) {
  const elementCount = await frame.count(selectors);

  for (let i = 0; i < elementCount; i++) {
    await frame.nth(selectors, i).uncheck();
  }
});

// User scrolls into view if needed for a selector
When("User scrolls {string} into view", async function (selector) {
  await mouse.scrollIntoViewIfNeeded(selector);
});

// User uploads file
When("User uploads {string} file to {string}", async (filePath, fileInput) => {
  await mouse.upload(filePath, fileInput);
});

When("User selects by text from {string} randomly", async (select) => {
  const optionsArray = await element(`${selector(select)} option`).evaluateAll(
    (options) => options.map((option) => option.text),
  );
  const randomOption =
    await optionsArray[Math.floor(Math.random() * optionsArray.length)];

  await mouse.selectByText(select, randomOption);
});

When("User selects by value from {string} randomly", async (select) => {
  const optionsArray = await element(`${selector(select)} option`).evaluateAll(
    (options) => options.map((option) => option.value),
  );
  const randomOption =
    await optionsArray[Math.floor(Math.random() * optionsArray.length)];

  await mouse.selectByValue(select, randomOption);
});

When("User clicks either {string} or {string}", async (element, element2) => {
  await page.wait(1000);
  const countOfElement = await frame.count(element);
  if (countOfElement > 0) {
    await mouse.click(element);
  } else {
    await mouse.click(element2);
  }
});
