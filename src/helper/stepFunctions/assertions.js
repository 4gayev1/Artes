const { expect, element, context } = require("../imports/commons");
const { elementInteractions } = require("./elementInteractions");

const assert = {
  // Element Assertion
  shouldBeAttached: async (selector) => {
    await expect(element(selector)).toBeAttached();
  },
  shouldBeChecked: async (selector) => {
    await expect(element(selector)).toBeChecked();
  },
  shouldBeDisabled: async (selector) => {
    await expect(element(selector)).toBeDisabled();
  },
  shouldBeEditable: async (selector) => {
    await expect(element(selector)).toBeEditable();
  },
  shouldBeEmpty: async (selector) => {
    await expect(element(selector)).toBeEmpty();
  },
  shouldBeEnabled: async (selector) => {
    await expect(element(selector)).toBeEnabled();
  },
  shouldBeFocused: async (selector) => {
    await expect(element(selector)).toBeFocused();
  },
  shouldBeHidden: async (selector) => {
    await expect(element(selector)).toBeHidden();
  },
  shouldBeInViewport: async (selector) => {
    await expect(element(selector)).toBeInViewport();
  },
  shouldBeVisible: async (selector) => {
    await expect(element(selector)).toBeVisible();
  },
  shouldContainText: async (selector, text) => {
    await expect(element(selector)).toContainText(text);
  },
  shouldHaveAccessibleDescription: async (selector, description) => {
    await expect(element(selector)).toHaveAccessibleDescription(description);
  },
  shouldHaveAccessibleName: async (selector, name) => {
    await expect(element(selector)).toHaveAccessibleName(name);
  },
  shouldHaveAttribute: async (selector, attribute, value) => {
    await expect(element(selector)).toHaveAttribute(attribute, value);
  },
  shouldHaveClass: async (selector, className) => {
    await expect(element(selector)).toHaveClass(className);
  },
  shouldHaveCount: async (selector, count) => {
    await expect(element(selector)).toHaveCount(count);
  },
  shouldHaveCSS: async (selector, property, value) => {
    await expect(element(selector)).toHaveCSS(property, value);
  },
  shouldHaveId: async (selector, id) => {
    await expect(element(selector)).toHaveId(id);
  },
  shouldHaveJSProperty: async (selector, property, value) => {
    await expect(element(selector)).toHaveJSProperty(property, value);
  },
  shouldHaveRole: async (selector, role) => {
    await expect(element(selector)).toHaveRole(role);
  },
  shouldHaveScreenshot: async (selector) => {
    await expect(element(selector)).toHaveScreenshot();
  },
  shouldHaveText: async (selector, text) => {
    await expect(element(selector)).toHaveText(text);
  },
  shouldHaveValue: async (selector, value) => {
    await expect(element(selector)).toHaveValue(value);
  },
  shouldHaveValues: async (selector, values) => {
    await expect(element(selector)).toHaveValues(values);
  },
  shouldPageHaveScreenshot: async () => {
    await expect(context.page).toHaveScreenshot();
  },
  shouldPageHaveTitle: async (title) => {
    await expect(context.page).toHaveTitle(title);
  },
  shouldPageHaveURL: async (url) => {
    await expect(context.page).toHaveURL(url);
  },
  shouldResponseBeOK: async (response) => {
    await expect(response).toBeOK();
  },

  // Negative Element Assertion
  shouldNotBeAttached: async (selector) => {
    await expect(element(selector)).not.toBeAttached();
  },
  shouldNotBeChecked: async (selector) => {
    await expect(element(selector)).not.toBeChecked();
  },
  shouldNotBeDisabled: async (selector) => {
    await expect(element(selector)).not.toBeDisabled();
  },
  shouldNotBeEditable: async (selector) => {
    await expect(element(selector)).not.toBeEditable();
  },
  shouldNotBeEmpty: async (selector) => {
    await expect(element(selector)).not.toBeEmpty();
  },
  shouldNotBeEnabled: async (selector) => {
    await expect(element(selector)).not.toBeEnabled();
  },
  shouldNotBeFocused: async (selector) => {
    await expect(element(selector)).not.toBeFocused();
  },
  shouldNotBeHidden: async (selector) => {
    await expect(element(selector)).not.toBeHidden();
  },
  shouldNotBeInViewport: async (selector) => {
    await expect(element(selector)).not.toBeInViewport();
  },
  shouldNotBeVisible: async (selector) => {
    await expect(element(selector)).not.toBeVisible();
  },
  shouldNotContainText: async (selector, text) => {
    await expect(element(selector)).not.toContainText(text);
  },
  shouldNotHaveAccessibleDescription: async (selector, description) => {
    await expect(element(selector)).not.toHaveAccessibleDescription(
      description,
    );
  },
  shouldNotHaveAccessibleName: async (selector, name) => {
    await expect(element(selector)).not.toHaveAccessibleName(name);
  },
  shouldNotHaveAttribute: async (selector, attribute, value) => {
    await expect(element(selector)).not.toHaveAttribute(attribute, value);
  },
  shouldNotHaveClass: async (selector, className) => {
    await expect(element(selector)).not.toHaveClass(className);
  },
  shouldNotHaveCount: async (selector, count) => {
    await expect(element(selector)).not.toHaveCount(count);
  },
  shouldNotHaveCSS: async (selector, property, value) => {
    await expect(element(selector)).not.toHaveCSS(property, value);
  },
  shouldNotHaveId: async (selector, id) => {
    await expect(element(selector)).not.toHaveId(id);
  },
  shouldNotHaveJSProperty: async (selector, property, value) => {
    await expect(element(selector)).not.toHaveJSProperty(property, value);
  },
  shouldNotHaveRole: async (selector, role) => {
    await expect(element(selector)).not.toHaveRole(role);
  },
  shouldNotHaveScreenshot: async (selector) => {
    await expect(element(selector)).not.toHaveScreenshot();
  },
  shouldNotHaveText: async (selector, text) => {
    await expect(element(selector)).not.toHaveText(text);
  },
  shouldNotHaveValue: async (selector, value) => {
    await expect(element(selector)).not.toHaveValue(value);
  },
  shouldNotHaveValues: async (selector, values) => {
    await expect(element(selector)).not.toHaveValues(values);
  },
  shouldNotPageHaveScreenshot: async () => {
    await expect(context.page).not.toHaveScreenshot();
  },
  shouldNotPageHaveTitle: async (title) => {
    await expect(context.page).not.toHaveTitle(title);
  },
  shouldNotPageHaveURL: async (url) => {
    await expect(context.page).not.toHaveURL(url);
  },
  shouldNotResponseBeOK: async (response) => {
    await expect(response).not.toBeOK();
  },

  // Value Assertion

  shouldBe: (selector, expected) => {
    expect(elementInteractions.textContent(selector)).toBe(expected);
  },
  shouldBeCloseTo: (selector, expected, precision) => {
    expect(Number(elementInteractions.textContent(selector))).toBeCloseTo(
      expected,
      precision,
    );
  },
  shouldBeDefined: (selector) => {
    expect(elementInteractions.textContent(selector)).toBeDefined();
  },
  shouldBeFalsy: (selector) => {
    expect(elementInteractions.textContent(selector)).toBeFalsy();
  },
  shouldBeGreaterThan: (selector, expected) => {
    expect(Number(elementInteractions.textContent(selector))).toBeGreaterThan(
      expected,
    );
  },
  shouldBeGreaterThanOrEqual: (selector, expected) => {
    expect(
      Number(elementInteractions.textContent(selector)),
    ).toBeGreaterThanOrEqual(expected);
  },
  shouldBeInstanceOf: (selector, constructor) => {
    expect(elementInteractions.textContent(selector)).toBeInstanceOf(
      constructor,
    );
  },
  shouldBeLessThan: (selector, expected) => {
    expect(Number(elementInteractions.textContent(selector))).toBeLessThan(
      expected,
    );
  },
  shouldBeLessThanOrEqual: (selector, expected) => {
    expect(
      Number(elementInteractions.textContent(selector)),
    ).toBeLessThanOrEqual(expected);
  },
  shouldBeNaN: (selector) => {
    expect(Number(elementInteractions.textContent(selector))).toBeNaN();
  },
  shouldBeNull: (selector) => {
    expect(elementInteractions.textContent(selector)).toBeNull();
  },
  shouldBeTruthy: (selector) => {
    expect(elementInteractions.textContent(selector)).toBeTruthy();
  },
  shouldBeUndefined: (selector) => {
    expect(elementInteractions.textContent(selector)).toBeUndefined();
  },
  shouldContain: (selector, substring) => {
    expect(elementInteractions.textContent(selector)).toContain(substring);
  },
  shouldContainEqual: (selector, expected) => {
    expect(elementInteractions.textContent(selector)).toContainEqual(element);
  },
  shouldEqual: (selector, expected) => {
    expect(Number(elementInteractions.textContent(selector))).toEqual(expected);
  },
  shouldHaveLength: (selector, length) => {
    expect(elementInteractions.textContent(selector)).toHaveLength(length);
  },
  shouldHaveProperty: (selector, property) => {
    expect(elementInteractions.textContent(selector)).toHaveProperty(property);
  },
  shouldMatch: (selector, regex) => {
    expect(elementInteractions.textContent(selector)).toMatch(regex);
  },
  shouldMatchObject: (selector, object) => {
    expect(elementInteractions.textContent(selector)).toMatchObject(object);
  },
  shouldStrictEqual: (selector, expected) => {
    expect(Number(elementInteractions.textContent(selector))).toStrictEqual(
      expected,
    );
  },
  shouldThrow: (fn) => {
    expect(fn).toThrow();
  },
  shouldAny: (selector, constructor) => {
    expect(elementInteractions.textContent(selector)).any.toBeInstanceOf(
      constructor,
    );
  },
  shouldAnything: (selector) => {
    expect(elementInteractions.textContent(selector)).anything();
  },
  shouldArrayContaining: (selector, elements) => {
    expect(elementInteractions.textContent(selector)).toEqual(
      expect.arrayContaining(elements),
    );
  },
  shouldCloseTo: (selector, expected, precision) => {
    expect(Number(elementInteractions.textContent(selector))).toBeCloseTo(
      expected,
      precision,
    );
  },
  shouldObjectContaining: (selector, properties) => {
    expect(elementInteractions.textContent(selector)).toEqual(
      expect.objectContaining(properties),
    );
  },
  shouldStringContaining: (selector, substring) => {
    expect(elementInteractions.textContent(selector)).toEqual(
      expect.stringContaining(substring),
    );
  },
  shouldStringMatching: (selector, regex) => {
    expect(elementInteractions.textContent(selector)).toEqual(
      expect.stringMatching(regex),
    );
  },

  // Negative Value Assertion
  shouldNotBe: (selector, expected) => {
    expect(elementInteractions.textContent(selector)).not.toBe(expected);
  },
  shouldNotBeCloseTo: (selector, expected, precision) => {
    expect(Number(elementInteractions.textContent(selector))).not.toBeCloseTo(
      expected,
      precision,
    );
  },
  shouldNotBeDefined: (selector) => {
    expect(elementInteractions.textContent(selector)).not.toBeDefined();
  },
  shouldNotBeFalsy: (selector) => {
    expect(elementInteractions.textContent(selector)).not.toBeFalsy();
  },
  shouldNotBeGreaterThan: (selector, expected) => {
    expect(elementInteractions.textContent(selector)).not.toBeGreaterThan(
      expected,
    );
  },
  shouldNotBeGreaterThanOrEqual: (selector, expected) => {
    expect(
      Number(elementInteractions.textContent(selector)),
    ).not.toBeGreaterThanOrEqual(expected);
  },
  shouldNotBeInstanceOf: (selector, constructor) => {
    expect(elementInteractions.textContent(selector)).not.toBeInstanceOf(
      constructor,
    );
  },
  shouldNotBeLessThan: (selector, expected) => {
    expect(Number(elementInteractions.textContent(selector))).not.toBeLessThan(
      expected,
    );
  },
  shouldNotBeLessThanOrEqual: (selector, expected) => {
    expect(
      Number(elementInteractions.textContent(selector)),
    ).not.toBeLessThanOrEqual(expected);
  },
  shouldNotBeNaN: (selector) => {
    expect(Number(elementInteractions.textContent(selector))).not.toBeNaN();
  },
  shouldNotBeNull: (selector) => {
    expect(elementInteractions.textContent(selector)).not.toBeNull();
  },
  shouldNotBeTruthy: (selector) => {
    expect(elementInteractions.textContent(selector)).not.toBeTruthy();
  },
  shouldNotBeUndefined: (selector) => {
    expect(elementInteractions.textContent(selector)).not.toBeUndefined();
  },
  shouldNotContain: (selector, substring) => {
    expect(elementInteractions.textContent(selector)).not.toContain(substring);
  },
  shouldNotContainEqual: (selector, expected) => {
    expect(
      Number(elementInteractions.textContent(selector)),
    ).not.toContainEqual(element);
  },
  shouldNotEqual: (selector, expected) => {
    expect(Number(elementInteractions.textContent(selector))).not.toEqual(
      expected,
    );
  },
  shouldNotHaveLength: (selector, length) => {
    expect(elementInteractions.textContent(selector)).not.toHaveLength(length);
  },
  shouldNotHaveProperty: (selector, property) => {
    expect(elementInteractions.textContent(selector)).not.toHaveProperty(
      property,
    );
  },
  shouldNotMatch: (selector, regex) => {
    expect(elementInteractions.textContent(selector)).not.toMatch(regex);
  },
  shouldNotMatchObject: (selector, object) => {
    expect(elementInteractions.textContent(selector)).not.toMatchObject(object);
  },
  shouldNotStrictEqual: (selector, expected) => {
    expect(Number(elementInteractions.textContent(selector))).not.toStrictEqual(
      expected,
    );
  },
  shouldNotThrow: (fn) => {
    expect(fn).not.toThrow();
  },
  shouldNotAny: (selector, constructor) => {
    expect(elementInteractions.textContent(selector)).any.toBeInstanceOf(
      constructor,
    );
  },
  shouldNotAnything: (selector) => {
    expect(elementInteractions.textContent(selector)).not.anything();
  },
  shouldNotArrayContaining: (selector, elements) => {
    expect(elementInteractions.textContent(selector)).not.toEqual(
      expect.arrayContaining(elements),
    );
  },
  shouldNotCloseTo: (selector, expected, precision) => {
    expect(Number(elementInteractions.textContent(selector))).not.toBeCloseTo(
      expected,
      precision,
    );
  },
  shouldNotObjectContaining: (selector, properties) => {
    expect(elementInteractions.textContent(selector)).not.toEqual(
      expect.objectContaining(properties),
    );
  },
  shouldNotStringContaining: (selector, substring) => {
    expect(elementInteractions.textContent(selector)).not.toEqual(
      expect.stringContaining(substring),
    );
  },
  shouldNotStringMatching: (selector, regex) => {
    expect(elementInteractions.textContent(selector)).not.toEqual(
      expect.stringMatchingStringMatching(regex),
    );
  },
};

module.exports = { assert };
