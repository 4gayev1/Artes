const { When } = require("../helper/imports/commons");
const { frame } = require("../helper/stepFunctions/exporter");
const { saveVar, element} = require("artes");

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




When("User saves the value of {string} as {string}", async function (selector, varName) {

async function extractElementValue(locator) {
  await locator.waitFor({ state: "visible" });

  const tagName = await locator.evaluate((el) => el.tagName.toLowerCase());
  const normalize = (str) => str?.replace(/\s+/g, " ").trim();

  if (["input", "textarea"].includes(tagName)) {
    return normalize(await locator.inputValue());
  }

  if (tagName === "select") {
    return normalize(
      await locator.evaluate((el) => el.options[el.selectedIndex]?.text)
    );
  }

  if (tagName === "img") {
    return normalize(await locator.getAttribute("alt"));
  }

  // Try several strategies in order, use the first non-empty result
  const strategies = [
    () => locator.innerText(),
    () => locator.textContent(),
    () => locator.getAttribute("value"),
    () => locator.getAttribute("aria-label"),
    () => locator.getAttribute("title"),
    () => locator.getAttribute("placeholder"),
    () => locator.getAttribute("alt"),
  ];

  for (const strategy of strategies) {
    try {
      const result = normalize(await strategy());
      if (result) return result;
    } catch {
      // strategy not applicable to this element, try next
      continue;
    }
  }

  return "";
}

  const locator = element(selector);
  const value = await extractElementValue(locator);
    console.log( typeof locator)

    saveVar(value, varName);

});


When(
  "User saves the value of {int} th of {string} as {string}",
  async function (ordinal, selector, varName) {


async function extractElementValue(locator) {
  await locator.waitFor({ state: "visible" });

  const tagName = await locator.evaluate((el) => el.tagName.toLowerCase());
  const normalize = (str) => str?.replace(/\s+/g, " ").trim();

  if (["input", "textarea"].includes(tagName)) {
    return normalize(await locator.inputValue());
  }

  if (tagName === "select") {
    return normalize(
      await locator.evaluate((el) => el.options[el.selectedIndex]?.text)
    );
  }

  if (tagName === "img") {
    return normalize(await locator.getAttribute("alt"));
  }

  const strategies = [
    () => locator.innerText(),
    () => locator.textContent(),
    () => locator.getAttribute("value"),
    () => locator.getAttribute("aria-label"),
    () => locator.getAttribute("title"),
    () => locator.getAttribute("placeholder"),
    () => locator.getAttribute("alt"),
  ];

  for (const strategy of strategies) {
    try {
      const result = normalize(await strategy());
      if (result) return result;
    } catch {
      continue;
    }
  }

  return "";
}

function ordinalToIndex(ordinal) {
  const num = parseInt(ordinal, 10);
  if (isNaN(num) || num < 1) {
    throw new Error(`Invalid ordinal "${ordinal}" — must be like "1st", "2nd", "3rd", "4th"...`);
  }
  return num - 1;
}


    const index = ordinalToIndex(ordinal);
    const baseLocator = element(selector);

    const count = await baseLocator.count();
    if (index >= count) {
      throw new Error(
        `Requested ${ordinal} match for "${selector}", but only ${count} element(s) found.`
      );
    }

    const locator = baseLocator.nth(index);
    const value = await extractElementValue(locator);

    saveVar(value, varName);
  }
);