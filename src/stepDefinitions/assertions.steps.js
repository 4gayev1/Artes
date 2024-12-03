const { Then, selector } = require("../helper/imports/commons");
const { assert } = require("../helper/stepFunctions/exporter");

// Check if a selector should be attached
Then("User expects {string} should be attached", async function (selector) {
  await assert.shouldBeAttached(selector);
});

// Check if a selector should be checked
Then("User expects {string} should be checked", async function (selector) {
  await assert.shouldBeChecked(selector);
});

// Check if a selector should be disabled
Then("User expects {string} should be disabled", async function (selector) {
  await assert.shouldBeDisabled(selector);
});

// Check if a selector should be editable
Then("User expects {string} should be editable", async function (selector) {
  await assert.shouldBeEditable(selector);
});

// Check if a selector should be empty
Then("User expects {string} should be empty", async function (selector) {
  await assert.shouldBeEmpty(selector);
});

// Check if a selector should be enabled
Then("User expects {string} should be enabled", async function (selector) {
  await assert.shouldBeEnabled(selector);
});

// Check if a selector should be focused
Then("User expects {string} should be focused", async function (selector) {
  await assert.shouldBeFocused(selector);
});

// Check if a selector should be hidden
Then("User expects {string} should be hidden", async function (selector) {
  await assert.shouldBeHidden(selector);
});

// Check if a selector should be in the viewport
Then(
  "User expects {string} should be on the screen",
  async function (selector) {
    await assert.shouldBeInViewport(selector);
  },
);

// Check if a selector should be visible
Then("User expects {string} should be visible", async function (selector) {
  await assert.shouldBeVisible(selector);
});

// Check if a selector should contain specific text
Then(
  "User expects {string} should have {string} text",
  async function (selector, text) {
    await assert.shouldContainText(selector, text);
  },
);

// Check if a selector should have an accessible description
Then(
  "User expects {string} should have {string} description",
  async function (selector, description) {
    await assert.shouldHaveAccessibleDescription(selector, description);
  },
);

// Check if a selector should have an accessible name
Then(
  "User expects {string} should have {string} name",
  async function (selector, name) {
    await assert.shouldHaveAccessibleName(selector, name);
  },
);

// Check if a selector should have a specific attribute with a given value
Then(
  "User expects {string} should have {string} attribute with {string} value",
  async function (selector, attribute, value) {
    await assert.shouldHaveAttribute(selector, attribute, value);
  },
);

// Check if a selector should have a specific class
Then(
  "User expects {string} should have {string} class",
  async function (selector, className) {
    await assert.shouldHaveClass(selector, className);
  },
);

// Check if a selector should have a specific count
Then(
  "User expects count of {string} should be {int}",
  async function (selector, count) {
    await assert.shouldHaveCount(selector, count);
  },
);

// Check if a selector should have a specific CSS property with a given value
Then(
  "User expects {string} should have {string} CSS property with {string} value",
  async function (selector, property, value) {
    await assert.shouldHaveCSS(selector, property, value);
  },
);

// Check if a selector should have a specific id
Then(
  "User expects {string} should have {string} id",
  async function (selector, id) {
    await assert.shouldHaveId(selector, id);
  },
);

// Check if a selector should have a specific JavaScript property with a given value
Then(
  "User expects {string} should have {string} JavaScript property with {string} value",
  async function (selector, property, value) {
    await assert.shouldHaveJSProperty(selector, property, value);
  },
);

// Check if a selector should have a specific role
Then(
  "User expects {string} should have {string} role",
  async function (selector, role) {
    await assert.shouldHaveRole(selector, role);
  },
);

// Check if a selector should have a screenshot
Then(
  "User expects {string} should have a screenshot",
  async function (selector) {
    await assert.shouldHaveScreenshot(selector);
  },
);

// Check if a selector should have specific text
Then(
  "User expects {string} should match {string} text",
  async function (selector, text) {
    await assert.shouldHaveText(selector, text);
  },
);

// Check if a selector should have a specific value
Then(
  "User expects {string} should have {string} value",
  async function (selector, value) {
    await assert.shouldHaveValue(selector, value);
  },
);

// Check if a selector should have specific values
Then(
  "User expects {string} should have {string} values",
  async function (selector, values) {
    await assert.shouldHaveValues(selector, values.split(","));
  },
);

// Check if the page should have a screenshot
Then("User expects the page should have a screenshot", async function () {
  await assert.shouldPageHaveScreenshot();
});

// Check if the page should have a specific title
Then(
  "User expects the page should have {string} title",
  async function (title) {
    await assert.shouldPageHaveTitle(title);
  },
);

// Check if the page should have a specific URL
Then("User expects to be in {string} page", async function (url) {
  const URL = await selector(url);
  await assert.shouldPageHaveURL(URL);
});

// Check if the response should be OK
Then("The response should be OK", async function (response) {
  await assert.shouldResponseBeOK(response);
});

// Check if a selector should not be attached
Then("User expects {string} should not be attached", async function (selector) {
  await assert.shouldNotBeAttached(selector);
});

// Check if a selector should not be checked
Then("User expects {string} should not be checked", async function (selector) {
  await assert.shouldNotBeChecked(selector);
});

// Check if a selector should not be disabled
Then("User expects {string} should not be disabled", async function (selector) {
  await assert.shouldNotBeDisabled(selector);
});

// Check if a selector should not be editable
Then("User expects {string} should not be editable", async function (selector) {
  await assert.shouldNotBeEditable(selector);
});

// Check if a selector should not be empty
Then("User expects {string} should not be empty", async function (selector) {
  await assert.shouldNotBeEmpty(selector);
});

// Check if a selector should not be enabled
Then("User expects {string} should not be enabled", async function (selector) {
  await assert.shouldNotBeEnabled(selector);
});

// Check if a selector should not be focused
Then("User expects {string} should not be focused", async function (selector) {
  await assert.shouldNotBeFocused(selector);
});

// Check if a selector should not be hidden
Then("User expects {string} should not be hidden", async function (selector) {
  await assert.shouldNotBeHidden(selector);
});

// Check if a selector should not be in the viewport
Then(
  "User expects {string} should not be on screen",
  async function (selector) {
    await assert.shouldNotBeInViewport(selector);
  },
);

// Check if a selector should not be visible
Then("User expects {string} should not be visible", async function (selector) {
  await assert.shouldNotBeVisible(selector);
});

// Check if a selector should not contain specific text
Then(
  "User expects {string} should not have {string} text",
  async function (selector, text) {
    await assert.shouldNotContainText(selector, text);
  },
);

// Check if a selector should not have an accessible description
Then(
  "User expects {string} should not have {string} description",
  async function (selector, description) {
    await assert.shouldNotHaveAccessibleDescription(selector, description);
  },
);

// Check if a selector should not have an accessible name
Then(
  "User expects {string} should not have {string} name",
  async function (selector, name) {
    await assert.shouldNotHaveAccessibleName(selector, name);
  },
);

// Check if a selector should not have a specific attribute with a given value
Then(
  "User expects {string} should not have {string} attribute with {string} value",
  async function (selector, attribute, value) {
    await assert.shouldNotHaveAttribute(selector, attribute, value);
  },
);

// Check if a selector should not have a specific class
Then(
  "User expects {string} should not have {string} class",
  async function (selector, className) {
    await assert.shouldNotHaveClass(selector, className);
  },
);

// Check if a selector should not have a specific count
Then(
  "User expects count of {string} should not be {int}",
  async function (selector, count) {
    await assert.shouldNotHaveCount(selector, count);
  },
);

// Check if a selector should not have a specific CSS property with a given value
Then(
  "User expects {string} should not have {string} CSS property with {string} value",
  async function (selector, property, value) {
    await assert.shouldNotHaveCSS(selector, property, value);
  },
);

// Check if a selector should not have a specific ID
Then(
  "User expects {string} should not have {string} id",
  async function (selector, id) {
    await assert.shouldNotHaveId(selector, id);
  },
);

// Check if a selector should not have a specific JavaScript property with a given value
Then(
  "User expects {string} should not have {string} JavaScript property with {string} value",
  async function (selector, property, value) {
    await assert.shouldNotHaveJSProperty(selector, property, value);
  },
);

// Check if a selector should not have a specific role
Then(
  "User expects {string} should not have {string} role",
  async function (selector, role) {
    await assert.shouldNotHaveRole(selector, role);
  },
);

// Check if a selector should not have specific text
Then(
  "User expects {string} should not match {string} text",
  async function (selector, text) {
    await assert.shouldNotHaveText(selector, text);
  },
);

// Check if a selector should not have a specific value
Then(
  "User expects {string} should not have {string} value",
  async function (selector, value) {
    await assert.shouldNotHaveValue(selector, value);
  },
);

// Check if a selector should not have specific values
Then(
  "User expects {string} should not have {string} values",
  async function (selector, values) {
    await assert.shouldNotHaveValues(selector, values.split(","));
  },
);

// Check if the page should not have a screenshot
Then("User expects the page should not have a screenshot", async function () {
  await assert.shouldNotPageHaveScreenshot();
});

// Check if the page should not have a specific title
Then(
  "User expects the page should not have {string} title",
  async function (title) {
    await assert.shouldNotPageHaveTitle(title);
  },
);

// Check if the page should not have a specific URL
Then("User expects the page url should not be {string}", async function (url) {
  await assert.shouldNotPageHaveURL(url);
});

Then("User is not on {string} page", async function (url) {
  await assert.shouldNotPageHaveURL(url);
});

// Check if a response should not be OK
Then("The response should not be OK", async function (response) {
  await assert.shouldNotResponseBeOK(response);
});

// Check if a selector's value should be equal to the expected value
Then(
  "User expects {string} should be {string} text",
  async function (selector, expected) {
    await assert.shouldBe(selector, expected);
  },
);

// Check if a selector's value should be close to the expected value within a precision
Then(
  "User expects {string} should be close to {float} with precision {int}",
  async function (selector, expected, precision) {
    await assert.shouldBeCloseTo(selector, expected, precision);
  },
);

// Check if a selector's value should be defined
Then("User expects {string} should be defined", async function (selector) {
  await assert.shouldBeDefined(selector);
});

// Check if a selector's text content should be falsy
Then("User expects {string} should be falsy", async function (selector) {
  await assert.shouldBeFalsy(selector);
});

// Check if a selector's value should be greater than the expected value
Then(
  "User expects {string} should be greater than {float}",
  async function (selector, expected) {
    await assert.shouldBeGreaterThan(selector, expected);
  },
);

// Check if a selector's value should be greater than or equal to the expected value
Then(
  "User expects {string} should be greater than or equal to {float}",
  async function (selector, expected) {
    await assert.shouldBeGreaterThanOrEqual(selector, expected);
  },
);

// Check if a selector's value should be an instance of a specific constructor
Then(
  "User expects {string} should be an instance of {string}",
  async function (selector, constructor) {
    await assert.shouldBeInstanceOf(selector, constructor);
  },
);

// Check if a selector's value should be less than the expected value
Then(
  "User expects {string} should be less than {float}",
  async function (selector, expected) {
    await assert.shouldBeLessThan(selector, expected);
  },
);

// Check if a selector's value should be less than or equal to the expected value
Then(
  "User expects {string} should be less than or equal to {float}",
  async function (selector, expected) {
    await assert.shouldBeLessThanOrEqual(selector, expected);
  },
);

// Check if a selector's value should be NaN
Then("User expects {string} should be NaN", async function (selector) {
  await assert.shouldBeNaN(selector);
});

// Check if a selector's value should be null
Then("User expects {string} should be null", async function (selector) {
  await assert.shouldBeNull(selector);
});

// Check if a selector's value should be truthy
Then("User expects {string} should be truthy", async function (selector) {
  await assert.shouldBeTruthy(selector);
});

// Check if a selector's value should be undefined
Then("User expects {string} should be undefined", async function (selector) {
  await assert.shouldBeUndefined(selector);
});

// Check if a selector's value should contain a specific substring
Then(
  "User expects {string} should have {string} substring",
  async function (selector, substring) {
    await assert.shouldContain(selector, substring);
  },
);

// Check if a selector's value should contain an equal value
Then(
  "User expects {string} should contain equal {string}",
  async function (selector, expected) {
    await assert.shouldContainEqual(selector, expected);
  },
);

// Check if a selector's value should equal the expected value
Then(
  "User expects {string} should equal {int}",
  async function (selector, expected) {
    await assert.shouldEqual(selector, expected);
  },
);

// Check if a selector's text content should have a specific length
Then(
  "User expects length of {string} should be {int}",
  async function (selector, length) {
    await assert.shouldHaveLength(selector, length);
  },
);

// Check if a selector's text content should have a specific property
Then(
  "User expects {string} should have {string} property",
  async function (selector, property) {
    await assert.shouldHaveProperty(selector, property);
  },
);

// Check if a selector's text content should match a specific regex
Then(
  "User expects {string} should match {string} regex",
  async function (selector, regex) {
    await assert.shouldMatch(selector, new RegExp(regex));
  },
);

// Check if a selector's text content should match a specific object
Then(
  "User expects {string} should match {string} object",
  async function (selector, object) {
    await assert.shouldMatchObject(selector, JSON.parse(object));
  },
);

// Check if a selector's text content should strictly equal the expected value
Then(
  "User expects {string} should strictly equal {string}",
  async function (selector, expected) {
    await assert.shouldStrictEqual(selector, expected);
  },
);

// Check if a async function should throw an error
Then("The async function should throw", async function (fn) {
  await assert.shouldThrow(fn);
});

// Check if the text content of a selector should be an instance of a specific constructor
Then(
  "User expects {string} should be any instance of {string}",
  async function (selector, constructor) {
    await assert.shouldAny(selector, constructor);
  },
);

// Check if the text content of a selector may be anything (truthy)
Then("User expects {string} may be anything", async function (selector) {
  await assert.shouldAnything(selector);
});

// Check if the text content of a selector should contain any of the specified elements in an array
Then(
  "User expects {string} should contain {string} array elements",
  async function (selector, elements) {
    const parsedElements = elements.split(",");
    await assert.shouldArrayContaining(selector, parsedElements);
  },
);

// Check if the text content of a selector should be close to the expected value within a precision
Then(
  "User expects {string} should be close to {float} with precision {int}",
  async function (selector, expected, precision) {
    await assert.shouldCloseTo(selector, expected, precision);
  },
);

// Check if the text content of a selector should contain the specified properties in an object
Then(
  "User expects {string} should contain {string} object properties",
  async function (selector, properties) {
    const parsedProperties = properties.split(",");
    await assert.shouldObjectContaining(selector, parsedProperties);
  },
);

// Check if the text content of a selector should contain a specific substring
Then(
  "User expects {string} should have {string} substring",
  async function (selector, substring) {
    await assert.shouldStringContaining(selector, substring);
  },
);

// Check if the text content of a selector should match a specific regex
Then(
  "User expects {string} should match {string} regex",
  async function (selector, regex) {
    await assert.shouldStringMatching(selector, new RegExp(regex));
  },
);

// Check if a selector's text content should not be equal to the expected value
Then(
  "User expects {string} should not be {string} text",
  async function (selector, expected) {
    await assert.shouldNotBe(selector, expected);
  },
);

// Check if a selector's text content should not be close to the expected value within a precision
Then(
  "User expects {string} should not be close to {float} with precision {int}",
  async function (selector, expected, precision) {
    await assert.shouldNotBeCloseTo(selector, expected, precision);
  },
);

// Check if a selector's text content should not be defined
Then("User expects {string} should not be defined", async function (selector) {
  await assert.shouldNotBeDefined(selector);
});

// Check if a selector's text content should not be falsy
Then("User expects {string} should not be falsy", async function (selector) {
  await assert.shouldNotBeFalsy(selector);
});

// Check if a selector's text content should not be greater than the expected value
Then(
  "User expects {string} should not be greater than {float}",
  async function (selector, expected) {
    await assert.shouldNotBeGreaterThan(selector, expected);
  },
);

// Check if a selector's text content should not be greater than or equal to the expected value
Then(
  "User expects {string} should not be greater than or equal to {float}",
  async function (selector, expected) {
    await assert.shouldNotBeGreaterThanOrEqual(selector, expected);
  },
);

// Check if a selector's text content should not be an instance of a specific constructor
Then(
  "User expects {string} should not be an instance of {string}",
  async function (selector, constructor) {
    await assert.shouldNotBeInstanceOf(selector, constructor);
  },
);

// Check if a selector's text content should not be less than the expected value
Then(
  "User expects {string} should not be less than {float}",
  async function (selector, expected) {
    await assert.shouldNotBeLessThan(selector, expected);
  },
);

// Check if a selector's text content should not be less than or equal to the expected value
Then(
  "User expects {string} should not be less than or equal to {float}",
  async function (selector, expected) {
    await assert.shouldNotBeLessThanOrEqual(selector, expected);
  },
);

// Check if a selector's text content should not be NaN
Then("User expects {string} should not be NaN", async function (selector) {
  await assert.shouldNotBeNaN(selector);
});

// Check if a selector's text content should not be null
Then("User expects {string} should not be null", async function (selector) {
  await assert.shouldNotBeNull(selector);
});

// Check if a selector's text content should not be truthy
Then("User expects {string} should not be truthy", async function (selector) {
  await assert.shouldNotBeTruthy(selector);
});

// Check if a selector's text content should not be undefined
Then(
  "User expects {string} should not be undefined",
  async function (selector) {
    await assert.shouldNotBeUndefined(selector);
  },
);

// Check if a selector's text content should not contain a specific substring
Then(
  "User expects {string} should not have {string} substring",
  async function (selector, substring) {
    await assert.shouldNotContain(selector, substring);
  },
);

// Check if a selector's text content should not contain an equal value
Then(
  "User expects {string} should not contain equal {string}",
  async function (selector, expected) {
    await assert.shouldNotContainEqual(selector, expected);
  },
);

// Check if a selector's text content should not equal the expected value
Then(
  "User expects {string} should not equal {string}",
  async function (selector, expected) {
    await assert.shouldNotEqual(selector, expected);
  },
);

// Check if a selector's text content should not have a specific length
Then(
  "User expects length of {string} should not be {int} ",
  async function (selector, length) {
    await assert.shouldNotHaveLength(selector, length);
  },
);

// Check if a selector's text content should not have a specific property
Then(
  "User expects {string} should not have {string} property",
  async function (selector, property) {
    await assert.shouldNotHaveProperty(selector, property);
  },
);

// Check if a selector's text content should not match a specific regex
Then(
  "User expects {string} should not match {string} regex",
  async function (selector, regex) {
    await assert.shouldNotMatch(selector, new RegExp(regex));
  },
);

// Check if a selector's text content should not match a specific object
Then(
  "User expects {string} should not match {string} object",
  async function (selector, object) {
    await assert.shouldNotMatchObject(selector, JSON.parse(object));
  },
);

// Check if a async function should not throw an error
Then("The async function should not throw", async function (fn) {
  await assert.shouldNotThrow(fn);
});

// Check if a selector's text content should not be any instance of a specific constructor
Then(
  "User expects {string} should not be any instance of {string}",
  async function (selector, constructor) {
    await assert.shouldNotAny(selector, constructor);
  },
);

// Check if a selector's text content may not be anything (falsy)
Then("User expects {string} may not be anything", async function (selector) {
  await assert.shouldNotAnything(selector);
});

// Check if a selector's text content should not contain any of the specified elements in an array
Then(
  "User expects {string} should not contain {string} array elements",
  async function (selector, elements) {
    const parsedElements = elements.split(",");
    await assert.shouldNotArrayContaining(selector, parsedElements);
  },
);

// Check if a selector's text content should not be close to the expected value within a precision
Then(
  "User expects {string} should not be close to {float} with precision {int}",
  async function (selector, expected, precision) {
    await assert.shouldNotCloseTo(selector, expected, precision);
  },
);

// Check if a selector's text content should not contain the specified properties in an object
Then(
  "User expects {string} should not contain {string} object properties",
  async function (selector, properties) {
    const parsedProperties = JSON.parse(properties);
    await assert.shouldNotObjectContaining(selector, parsedProperties);
  },
);

// Check if a selector's text content should not contain a specific substring
Then(
  "User expects {string} should not contain {string} substring",
  async function (selector, substring) {
    await assert.shouldNotStringContaining(selector, substring);
  },
);

// Check if a selector's text content should not match a specific regex
Then(
  "User expects {string} should not match {string} regex",
  async function (selector, regex) {
    await assert.shouldNotStringMatching(selector, new RegExp(regex));
  },
);
