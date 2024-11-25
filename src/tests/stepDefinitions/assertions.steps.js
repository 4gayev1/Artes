const { Then } = require("../../helper/imports/commons");
const { assert } = require("../../helper/stepFunctions/exporter");

// Check if a selector should be attached
Then("User expects {string} should be attached", function (selector) {
  assert.shouldBeAttached(selector);
});

// Check if a selector should be checked
Then("User expects {string} should be checked", function (selector) {
  assert.shouldBeChecked(selector);
});

// Check if a selector should be disabled
Then("User expects {string} should be disabled", function (selector) {
  assert.shouldBeDisabled(selector);
});

// Check if a selector should be editable
Then("User expects {string} should be editable", function (selector) {
  assert.shouldBeEditable(selector);
});

// Check if a selector should be empty
Then("User expects {string} should be empty", function (selector) {
  assert.shouldBeEmpty(selector);
});

// Check if a selector should be enabled
Then("User expects {string} should be enabled", function (selector) {
  assert.shouldBeEnabled(selector);
});

// Check if a selector should be focused
Then("User expects {string} should be focused", function (selector) {
  assert.shouldBeFocused(selector);
});

// Check if a selector should be hidden
Then("User expects {string} should be hidden", function (selector) {
  assert.shouldBeHidden(selector);
});

// Check if a selector should be in the viewport
Then("User expects {string} should be on the screen", function (selector) {
  assert.shouldBeInViewport(selector);
});

// Check if a selector should be visible
Then("User expects {string} should be visible", function (selector) {
  assert.shouldBeVisible(selector);
});

// Check if a selector should contain specific text
Then(
  "User expects {string} should have {string} text",
  function (selector, text) {
    assert.shouldContainText(selector, text);
  },
);

// Check if a selector should have an accessible description
Then(
  "User expects {string} should have {string} description",
  function (selector, description) {
    assert.shouldHaveAccessibleDescription(selector, description);
  },
);

// Check if a selector should have an accessible name
Then(
  "User expects {string} should have {string} name",
  function (selector, name) {
    assert.shouldHaveAccessibleName(selector, name);
  },
);

// Check if a selector should have a specific attribute with a given value
Then(
  "User expects {string} should have {string} attribute with {string} value",
  function (selector, attribute, value) {
    assert.shouldHaveAttribute(selector, attribute, value);
  },
);

// Check if a selector should have a specific class
Then(
  "User expects {string} should have {string} class",
  function (selector, className) {
    assert.shouldHaveClass(selector, className);
  },
);

// Check if a selector should have a specific count
Then(
  "User expects count of {string} should be {int}",
  function (selector, count) {
    assert.shouldHaveCount(selector, count);
  },
);

// Check if a selector should have a specific CSS property with a given value
Then(
  "User expects {string} should have {string} CSS property with {string} value",
  function (selector, property, value) {
    assert.shouldHaveCSS(selector, property, value);
  },
);

// Check if a selector should have a specific id
Then("User expects {string} should have {string} id", function (selector, id) {
  assert.shouldHaveId(selector, id);
});

// Check if a selector should have a specific JavaScript property with a given value
Then(
  "User expects {string} should have {string} JavaScript property with {string} value",
  function (selector, property, value) {
    assert.shouldHaveJSProperty(selector, property, value);
  },
);

// Check if a selector should have a specific role
Then(
  "User expects {string} should have {string} role",
  function (selector, role) {
    assert.shouldHaveRole(selector, role);
  },
);

// Check if a selector should have a screenshot
Then("User expects {string} should have a screenshot", function (selector) {
  assert.shouldHaveScreenshot(selector);
});

// Check if a selector should have specific text
Then(
  "User expects {string} should match {string} text",
  function (selector, text) {
    assert.shouldHaveText(selector, text);
  },
);

// Check if a selector should have a specific value
Then(
  "User expects {string} should have {string} value",
  function (selector, value) {
    assert.shouldHaveValue(selector, value);
  },
);

// Check if a selector should have specific values
Then(
  "User expects {string} should have {string} values",
  function (selector, values) {
    assert.shouldHaveValues(selector, values.split(","));
  },
);

// Check if the page should have a screenshot
Then("User expects the page should have a screenshot", function () {
  assert.shouldPageHaveScreenshot();
});

// Check if the page should have a specific title
Then("User expects the page should have {string} title", function (title) {
  assert.shouldPageHaveTitle(title);
});

// Check if the page should have a specific URL
Then("User expects the page url should be {string}", function (url) {
  assert.shouldPageHaveURL(url);
});

Then("User is on {string} page", function (url) {
  assert.shouldPageHaveURL(url);
});

// Check if the response should be OK
Then("The response should be OK", function (response) {
  assert.shouldResponseBeOK(response);
});

// Check if a selector should not be attached
Then("User expects {string} should not be attached", function (selector) {
  assert.shouldNotBeAttached(selector);
});

// Check if a selector should not be checked
Then("User expects {string} should not be checked", function (selector) {
  assert.shouldNotBeChecked(selector);
});

// Check if a selector should not be disabled
Then("User expects {string} should not be disabled", function (selector) {
  assert.shouldNotBeDisabled(selector);
});

// Check if a selector should not be editable
Then("User expects {string} should not be editable", function (selector) {
  assert.shouldNotBeEditable(selector);
});

// Check if a selector should not be empty
Then("User expects {string} should not be empty", function (selector) {
  assert.shouldNotBeEmpty(selector);
});

// Check if a selector should not be enabled
Then("User expects {string} should not be enabled", function (selector) {
  assert.shouldNotBeEnabled(selector);
});

// Check if a selector should not be focused
Then("User expects {string} should not be focused", function (selector) {
  assert.shouldNotBeFocused(selector);
});

// Check if a selector should not be hidden
Then("User expects {string} should not be hidden", function (selector) {
  assert.shouldNotBeHidden(selector);
});

// Check if a selector should not be in the viewport
Then("User expects {string} should not be on screen", function (selector) {
  assert.shouldNotBeInViewport(selector);
});

// Check if a selector should not be visible
Then("User expects {string} should not be visible", function (selector) {
  assert.shouldNotBeVisible(selector);
});

// Check if a selector should not contain specific text
Then(
  "User expects {string} should not have {string} text",
  function (selector, text) {
    assert.shouldNotContainText(selector, text);
  },
);

// Check if a selector should not have an accessible description
Then(
  "User expects {string} should not have {string} description",
  function (selector, description) {
    assert.shouldNotHaveAccessibleDescription(selector, description);
  },
);

// Check if a selector should not have an accessible name
Then(
  "User expects {string} should not have {string} name",
  function (selector, name) {
    assert.shouldNotHaveAccessibleName(selector, name);
  },
);

// Check if a selector should not have a specific attribute with a given value
Then(
  "User expects {string} should not have {string} attribute with {string} value",
  function (selector, attribute, value) {
    assert.shouldNotHaveAttribute(selector, attribute, value);
  },
);

// Check if a selector should not have a specific class
Then(
  "User expects {string} should not have {string} class",
  function (selector, className) {
    assert.shouldNotHaveClass(selector, className);
  },
);

// Check if a selector should not have a specific count
Then(
  "User expects count of {string} should not be {int}",
  function (selector, count) {
    assert.shouldNotHaveCount(selector, count);
  },
);

// Check if a selector should not have a specific CSS property with a given value
Then(
  "User expects {string} should not have {string} CSS property with {string} value",
  function (selector, property, value) {
    assert.shouldNotHaveCSS(selector, property, value);
  },
);

// Check if a selector should not have a specific ID
Then(
  "User expects {string} should not have {string} id",
  function (selector, id) {
    assert.shouldNotHaveId(selector, id);
  },
);

// Check if a selector should not have a specific JavaScript property with a given value
Then(
  "User expects {string} should not have {string} JavaScript property with {string} value",
  function (selector, property, value) {
    assert.shouldNotHaveJSProperty(selector, property, value);
  },
);

// Check if a selector should not have a specific role
Then(
  "User expects {string} should not have {string} role",
  function (selector, role) {
    assert.shouldNotHaveRole(selector, role);
  },
);

// Check if a selector should not have specific text
Then(
  "User expects {string} should not match {string} text",
  function (selector, text) {
    assert.shouldNotHaveText(selector, text);
  },
);

// Check if a selector should not have a specific value
Then(
  "User expects {string} should not have {string} value",
  function (selector, value) {
    assert.shouldNotHaveValue(selector, value);
  },
);

// Check if a selector should not have specific values
Then(
  "User expects {string} should not have {string} values",
  function (selector, values) {
    assert.shouldNotHaveValues(selector, values.split(","));
  },
);

// Check if the page should not have a screenshot
Then("User expects the page should not have a screenshot", function () {
  assert.shouldNotPageHaveScreenshot();
});

// Check if the page should not have a specific title
Then("User expects the page should not have {string} title", function (title) {
  assert.shouldNotPageHaveTitle(title);
});

// Check if the page should not have a specific URL
Then("User expects the page url should not be {string}", function (url) {
  assert.shouldNotPageHaveURL(url);
});

Then("User is not on {string} page", function (url) {
  assert.shouldNotPageHaveURL(url);
});

// Check if a response should not be OK
Then("The response should not be OK", function (response) {
  assert.shouldNotResponseBeOK(response);
});

// Check if a selector's value should be equal to the expected value
Then(
  "User expects {string} should be {string} text",
  function (selector, expected) {
    assert.shouldBe(selector, expected);
  },
);

// Check if a selector's value should be close to the expected value within a precision
Then(
  "User expects {string} should be close to {float} with precision {int}",
  function (selector, expected, precision) {
    assert.shouldBeCloseTo(selector, expected, precision);
  },
);

// Check if a selector's value should be defined
Then("User expects {string} should be defined", function (selector) {
  assert.shouldBeDefined(selector);
});

// Check if a selector's text content should be falsy
Then("User expects {string} should be falsy", function (selector) {
  assert.shouldBeFalsy(selector);
});

// Check if a selector's value should be greater than the expected value
Then(
  "User expects {string} should be greater than {float}",
  function (selector, expected) {
    assert.shouldBeGreaterThan(selector, expected);
  },
);

// Check if a selector's value should be greater than or equal to the expected value
Then(
  "User expects {string} should be greater than or equal to {float}",
  function (selector, expected) {
    assert.shouldBeGreaterThanOrEqual(selector, expected);
  },
);

// Check if a selector's value should be an instance of a specific constructor
Then(
  "User expects {string} should be an instance of {string}",
  function (selector, constructor) {
    assert.shouldBeInstanceOf(selector, constructor);
  },
);

// Check if a selector's value should be less than the expected value
Then(
  "User expects {string} should be less than {float}",
  function (selector, expected) {
    assert.shouldBeLessThan(selector, expected);
  },
);

// Check if a selector's value should be less than or equal to the expected value
Then(
  "User expects {string} should be less than or equal to {float}",
  function (selector, expected) {
    assert.shouldBeLessThanOrEqual(selector, expected);
  },
);

// Check if a selector's value should be NaN
Then("User expects {string} should be NaN", function (selector) {
  assert.shouldBeNaN(selector);
});

// Check if a selector's value should be null
Then("User expects {string} should be null", function (selector) {
  assert.shouldBeNull(selector);
});

// Check if a selector's value should be truthy
Then("User expects {string} should be truthy", function (selector) {
  assert.shouldBeTruthy(selector);
});

// Check if a selector's value should be undefined
Then("User expects {string} should be undefined", function (selector) {
  assert.shouldBeUndefined(selector);
});

// Check if a selector's value should contain a specific substring
Then(
  "User expects {string} should have {string} substring",
  function (selector, substring) {
    assert.shouldContain(selector, substring);
  },
);

// Check if a selector's value should contain an equal value
Then(
  "User expects {string} should contain equal {string}",
  function (selector, expected) {
    assert.shouldContainEqual(selector, expected);
  },
);

// Check if a selector's value should equal the expected value
Then("User expects {string} should equal {int}", function (selector, expected) {
  assert.shouldEqual(selector, expected);
});

// Check if a selector's text content should have a specific length
Then(
  "User expects length of {string} should be {int}",
  function (selector, length) {
    assert.shouldHaveLength(selector, length);
  },
);

// Check if a selector's text content should have a specific property
Then(
  "User expects {string} should have {string} property",
  function (selector, property) {
    assert.shouldHaveProperty(selector, property);
  },
);

// Check if a selector's text content should match a specific regex
Then(
  "User expects {string} should match {string} regex",
  function (selector, regex) {
    assert.shouldMatch(selector, new RegExp(regex));
  },
);

// Check if a selector's text content should match a specific object
Then(
  "User expects {string} should match {string} object",
  function (selector, object) {
    assert.shouldMatchObject(selector, JSON.parse(object));
  },
);

// Check if a selector's text content should strictly equal the expected value
Then(
  "User expects {string} should strictly equal {string}",
  function (selector, expected) {
    assert.shouldStrictEqual(selector, expected);
  },
);

// Check if a function should throw an error
Then("The function should throw", function (fn) {
  assert.shouldThrow(fn);
});

// Check if the text content of a selector should be an instance of a specific constructor
Then(
  "User expects {string} should be any instance of {string}",
  function (selector, constructor) {
    assert.shouldAny(selector, constructor);
  },
);

// Check if the text content of a selector may be anything (truthy)
Then("User expects {string} may be anything", function (selector) {
  assert.shouldAnything(selector);
});

// Check if the text content of a selector should contain any of the specified elements in an array
Then(
  "User expects {string} should contain {string} array elements",
  function (selector, elements) {
    const parsedElements = elements.split(",");
    assert.shouldArrayContaining(selector, parsedElements);
  },
);

// Check if the text content of a selector should be close to the expected value within a precision
Then(
  "User expects {string} should be close to {float} with precision {int}",
  function (selector, expected, precision) {
    assert.shouldCloseTo(selector, expected, precision);
  },
);

// Check if the text content of a selector should contain the specified properties in an object
Then(
  "User expects {string} should contain {string} object properties",
  function (selector, properties) {
    const parsedProperties = properties.split(",");
    assert.shouldObjectContaining(selector, parsedProperties);
  },
);

// Check if the text content of a selector should contain a specific substring
Then(
  "User expects {string} should have {string} substring",
  function (selector, substring) {
    assert.shouldStringContaining(selector, substring);
  },
);

// Check if the text content of a selector should match a specific regex
Then(
  "User expects {string} should match {string} regex",
  function (selector, regex) {
    assert.shouldStringMatching(selector, new RegExp(regex));
  },
);

// Check if a selector's text content should not be equal to the expected value
Then(
  "User expects {string} should not have {string} text",
  function (selector, expected) {
    assert.shouldNotBe(selector, expected);
  },
);

// Check if a selector's text content should not be close to the expected value within a precision
Then(
  "User expects {string} should not be close to {float} with precision {int}",
  function (selector, expected, precision) {
    assert.shouldNotBeCloseTo(selector, expected, precision);
  },
);

// Check if a selector's text content should not be defined
Then("User expects {string} should not be defined", function (selector) {
  assert.shouldNotBeDefined(selector);
});

// Check if a selector's text content should not be falsy
Then("User expects {string} should not be falsy", function (selector) {
  assert.shouldNotBeFalsy(selector);
});

// Check if a selector's text content should not be greater than the expected value
Then(
  "User expects {string} should not be greater than {float}",
  function (selector, expected) {
    assert.shouldNotBeGreaterThan(selector, expected);
  },
);

// Check if a selector's text content should not be greater than or equal to the expected value
Then(
  "User expects {string} should not be greater than or equal to {float}",
  function (selector, expected) {
    assert.shouldNotBeGreaterThanOrEqual(selector, expected);
  },
);

// Check if a selector's text content should not be an instance of a specific constructor
Then(
  "User expects {string} should not be an instance of {string}",
  function (selector, constructor) {
    assert.shouldNotBeInstanceOf(selector, constructor);
  },
);

// Check if a selector's text content should not be less than the expected value
Then(
  "User expects {string} should not be less than {float}",
  function (selector, expected) {
    assert.shouldNotBeLessThan(selector, expected);
  },
);

// Check if a selector's text content should not be less than or equal to the expected value
Then(
  "User expects {string} should not be less than or equal to {float}",
  function (selector, expected) {
    assert.shouldNotBeLessThanOrEqual(selector, expected);
  },
);

// Check if a selector's text content should not be NaN
Then("User expects {string} should not be NaN", function (selector) {
  assert.shouldNotBeNaN(selector);
});

// Check if a selector's text content should not be null
Then("User expects {string} should not be null", function (selector) {
  assert.shouldNotBeNull(selector);
});

// Check if a selector's text content should not be truthy
Then("User expects {string} should not be truthy", function (selector) {
  assert.shouldNotBeTruthy(selector);
});

// Check if a selector's text content should not be undefined
Then("User expects {string} should not be undefined", function (selector) {
  assert.shouldNotBeUndefined(selector);
});

// Check if a selector's text content should not contain a specific substring
Then(
  "User expects {string} should not have {string} substring",
  function (selector, substring) {
    assert.shouldNotContain(selector, substring);
  },
);

// Check if a selector's text content should not contain an equal value
Then(
  "User expects {string} should not contain equal {string}",
  function (selector, expected) {
    assert.shouldNotContainEqual(selector, expected);
  },
);

// Check if a selector's text content should not equal the expected value
Then(
  "User expects {string} should not equal {string}",
  function (selector, expected) {
    assert.shouldNotEqual(selector, expected);
  },
);

// Check if a selector's text content should not have a specific length
Then(
  "User expects length of {string} should not be {int} ",
  function (selector, length) {
    assert.shouldNotHaveLength(selector, length);
  },
);

// Check if a selector's text content should not have a specific property
Then(
  "User expects {string} should not have {string} property",
  function (selector, property) {
    assert.shouldNotHaveProperty(selector, property);
  },
);

// Check if a selector's text content should not match a specific regex
Then(
  "User expects {string} should not match {string} regex",
  function (selector, regex) {
    assert.shouldNotMatch(selector, new RegExp(regex));
  },
);

// Check if a selector's text content should not match a specific object
Then(
  "User expects {string} should not match {string} object",
  function (selector, object) {
    assert.shouldNotMatchObject(selector, JSON.parse(object));
  },
);

// Check if a function should not throw an error
Then("The function should not throw", function (fn) {
  assert.shouldNotThrow(fn);
});

// Check if a selector's text content should not be any instance of a specific constructor
Then(
  "User expects {string} should not be any instance of {string}",
  function (selector, constructor) {
    assert.shouldNotAny(selector, constructor);
  },
);

// Check if a selector's text content may not be anything (falsy)
Then("User expects {string} may not be anything", function (selector) {
  assert.shouldNotAnything(selector);
});

// Check if a selector's text content should not contain any of the specified elements in an array
Then(
  "User expects {string} should not contain {string} array elements",
  function (selector, elements) {
    const parsedElements = elements.split(",");
    assert.shouldNotArrayContaining(selector, parsedElements);
  },
);

// Check if a selector's text content should not be close to the expected value within a precision
Then(
  "User expects {string} should not be close to {float} with precision {int}",
  function (selector, expected, precision) {
    assert.shouldNotCloseTo(selector, expected, precision);
  },
);

// Check if a selector's text content should not contain the specified properties in an object
Then(
  "User expects {string} should not contain {string} object properties",
  function (selector, properties) {
    const parsedProperties = JSON.parse(properties);
    assert.shouldNotObjectContaining(selector, parsedProperties);
  },
);

// Check if a selector's text content should not contain a specific substring
Then(
  "User expects {string} should not contain {string} substring",
  function (selector, substring) {
    assert.shouldNotStringContaining(selector, substring);
  },
);

// Check if a selector's text content should not match a specific regex
Then(
  "User expects {string} should not match {string} regex",
  function (selector, regex) {
    assert.shouldNotStringMatching(selector, new RegExp(regex));
  },
);
