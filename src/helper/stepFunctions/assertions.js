const { expect, element, context } = require("../imports/commons");
const { elementInteractions } = require("./elementInteractions");
const { frame } = require("../stepFunctions/frameActions");

const assert = {
  // Element Assertion
  shouldBeAttached: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toBeAttached(options);
  },
  shouldBeChecked: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toBeChecked(options);
  },
  shouldBeDisabled: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toBeDisabled(options);
  },
  shouldBeEditable: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toBeEditable(options);
  },
  shouldBeEmpty: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toBeEmpty(options);
  },
  shouldBeEnabled: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toBeEnabled(options);
  },
  shouldBeFocused: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toBeFocused(options);
  },
  shouldBeHidden: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toBeHidden(options);
  },
  shouldBeInViewport: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toBeInViewport(options);
  },
  shouldBeVisible: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toBeVisible(options);
  },
  shouldContainText: async (selector, text, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toContainText(text, options);
  },
  multipleElementsShouldContainText: async (
    elements,
    expectedText,
    options,
  ) => {
    options = options ?? {};

    const count = await frame.count(elements);

    for (let i = 0; i < count; i++) {
      await assert.shouldContainText(
        frame.nth(elements, i),
        expectedText,
        options,
      );
    }
  },
  shouldHaveAccessibleDescription: async (selector, description, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toHaveAccessibleDescription(description, options);
  },
  shouldHaveAccessibleName: async (selector, name, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toHaveAccessibleName(name, options);
  },
  shouldHaveAttribute: async (selector, attribute, value, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toHaveAttribute(attribute, value, options);
  },
  shouldHaveClass: async (selector, className, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toHaveClass(className, options);
  },
  shouldHaveCount: async (selector, count, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toHaveCount(count, options);
  },
  shouldHaveCSS: async (selector, property, value, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toHaveCSS(property, value, options);
  },
  shouldHaveId: async (selector, id, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toHaveId(id, options);
  },
  shouldHaveJSProperty: async (selector, property, value, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toHaveJSProperty(property, value, options);
  },
  shouldHaveRole: async (selector, role, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toHaveRole(role, options);
  },
  shouldHaveScreenshot: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toHaveScreenshot(options);
  },
  shouldHaveText: async (selector, text, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toHaveText(text, options);
  },
  shouldHaveValue: async (selector, value, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toHaveValue(value, options);
  },
  shouldHaveValues: async (selector, values, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).toHaveValues(values, options);
  },
  shouldPageHaveScreenshot: async (options) => {
    options = options ?? {};

    await expect(context.page).toHaveScreenshot(options);
  },
  shouldPageHaveTitle: async (title, options) => {
    options = options ?? {};

    await expect(context.page).toHaveTitle(title, options);
  },
  shouldPageHaveURL: async (url, options) => {
    options = options ?? {};

    await expect(context.page).toHaveURL(url, options);
  },
  shouldResponseBeOK: async (response, options) => {
    options = options ?? {};

    await expect(response).toBeOK(options);
  },

  // Negative Element Assertion
  shouldNotBeAttached: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toBeAttached(options);
  },
  shouldNotBeChecked: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toBeChecked(options);
  },
  shouldNotBeDisabled: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toBeDisabled(options);
  },
  shouldNotBeEditable: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toBeEditable(options);
  },
  shouldNotBeEmpty: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toBeEmpty(options);
  },
  shouldNotBeEnabled: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toBeEnabled(options);
  },
  shouldNotBeFocused: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toBeFocused(options);
  },
  shouldNotBeHidden: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toBeHidden(options);
  },
  shouldNotBeInViewport: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toBeInViewport(options);
  },
  shouldNotBeVisible: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toBeVisible(options);
  },
  shouldNotContainText: async (selector, text, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toContainText(text, options);
  },
  shouldNotHaveAccessibleDescription: async (
    selector,
    description,
    options,
  ) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toHaveAccessibleDescription(description, options);
  },
  shouldNotHaveAccessibleName: async (selector, name, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toHaveAccessibleName(name, options);
  },
  shouldNotHaveAttribute: async (selector, attribute, value, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toHaveAttribute(attribute, value, options);
  },
  shouldNotHaveClass: async (selector, className, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toHaveClass(className, options);
  },
  shouldNotHaveCount: async (selector, count, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toHaveCount(count, options);
  },
  shouldNotHaveCSS: async (selector, property, value, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toHaveCSS(property, value, options);
  },
  shouldNotHaveId: async (selector, id, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toHaveId(id, options);
  },
  shouldNotHaveJSProperty: async (selector, property, value, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toHaveJSProperty(property, value, options);
  },
  shouldNotHaveRole: async (selector, role, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toHaveRole(role, options);
  },
  shouldNotHaveScreenshot: async (selector, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toHaveScreenshot(options);
  },
  shouldNotHaveText: async (selector, text, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toHaveText(text, options);
  },
  shouldNotHaveValue: async (selector, value, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toHaveValue(value, options);
  },
  shouldNotHaveValues: async (selector, values, options) => {
    options = options ?? {};

    await expect(
      typeof selector === "string" ? element(selector) : await selector,
    ).not.toHaveValues(values, options);
  },
  shouldNotPageHaveScreenshot: async (options) => {
    options = options ?? {};

    await expect(context.page).not.toHaveScreenshot(options);
  },
  shouldNotPageHaveTitle: async (title, options) => {
    options = options ?? {};

    await expect(context.page).not.toHaveTitle(title, options);
  },
  shouldNotPageHaveURL: async (url, options) => {
    options = options ?? {};

    await expect(context.page).not.toHaveURL(url, options);
  },
  shouldNotResponseBeOK: async (response, options) => {
    options = options ?? {};

    await expect(response).not.toBeOK(options);
  },
  // Value Assertion

  shouldBe: async (selector, expected, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).toBe(
      expected,
      options,
    );
  },
  shouldBeCloseTo: async (selector, expected, precision, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).toBeCloseTo(expected, precision, options);
  },
  shouldBeDefined: async (selector, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).toBeDefined(
      options,
    );
  },
  shouldBeFalsy: async (selector, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).toBeFalsy(
      options,
    );
  },
  shouldBeGreaterThan: async (selector, expected, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).toBeGreaterThan(expected, options);
  },
  shouldBeGreaterThanOrEqual: async (selector, expected, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).toBeGreaterThanOrEqual(expected, options);
  },
  shouldBeInstanceOf: async (selector, constructor, options) => {
    options = options ?? {};

    await expect(
      await elementInteractions.textContent(selector),
    ).toBeInstanceOf(constructor, options);
  },
  shouldBeLessThan: async (selector, expected, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).toBeLessThan(expected, options);
  },
  shouldBeLessThanOrEqual: async (selector, expected, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).toBeLessThanOrEqual(expected, options);
  },
  shouldBeNaN: async (selector, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).toBeNaN(options);
  },
  shouldBeNull: async (selector, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).toBeNull(
      options,
    );
  },
  shouldBeTruthy: async (selector, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).toBeTruthy(
      options,
    );
  },
  shouldBeUndefined: async (selector, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).toBeUndefined(
      options,
    );
  },
  shouldContain: async (selector, substring, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).toContain(
      substring,
      options,
    );
  },
  shouldContainEqual: async (selector, expected, options) => {
    options = options ?? {};

    await expect(
      await elementInteractions.textContent(selector),
    ).toContainEqual(expected, options);
  },
  shouldEqual: async (selector, expected, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).toEqual(expected, options);
  },
  shouldHaveLength: async (selector, length, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).toHaveLength(
      length,
      options,
    );
  },
  shouldHaveProperty: async (selector, property, options) => {
    options = options ?? {};

    await expect(
      await elementInteractions.textContent(selector),
    ).toHaveProperty(property, options);
  },
  shouldMatch: async (selector, regex, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).toMatch(
      regex,
      options,
    );
  },
  shouldMatchObject: async (selector, object, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).toMatchObject(
      object,
      options,
    );
  },
  shouldStrictEqual: async (selector, expected, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).toStrictEqual(expected, options);
  },
  shouldThrow: async (fn, options) => {
    options = options ?? {};

    await expect(fn).toThrow(options);
  },
  shouldAny: async (selector, constructor, options) => {
    options = options ?? {};

    await expect(
      await elementInteractions.textContent(selector),
    ).any.toBeInstanceOf(constructor, options);
  },
  shouldAnything: async (selector, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).anything(
      options,
    );
  },
  shouldArrayContaining: async (selector, elements, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).toEqual(
      expect.arrayContaining(elements),
      options,
    );
  },
  shouldCloseTo: async (selector, expected, precision, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).toBeCloseTo(expected, precision, options);
  },
  shouldObjectContaining: async (selector, properties, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).toEqual(
      expect.objectContaining(properties),
      options,
    );
  },
  shouldStringContaining: async (selector, substring, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).toEqual(
      expect.stringContaining(substring),
      options,
    );
  },
  shouldStringMatching: async (selector, regex, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).toEqual(
      expect.stringMatching(regex),
      options,
    );
  },

  // Negative Value Assertion
  shouldNotBe: async (selector, expected, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).not.toBe(
      expected,
      options,
    );
  },
  shouldNotBeCloseTo: async (selector, expected, precision, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).not.toBeCloseTo(expected, precision, options);
  },
  shouldNotBeDefined: async (selector, options) => {
    options = options ?? {};

    await expect(
      await elementInteractions.textContent(selector),
    ).not.toBeDefined(options);
  },
  shouldNotBeFalsy: async (selector, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).not.toBeFalsy(
      options,
    );
  },
  shouldNotBeGreaterThan: async (selector, expected, options) => {
    options = options ?? {};

    await expect(
      await elementInteractions.textContent(selector),
    ).not.toBeGreaterThan(expected, options);
  },
  shouldNotBeGreaterThanOrEqual: async (selector, expected, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).not.toBeGreaterThanOrEqual(expected, options);
  },
  shouldNotBeInstanceOf: async (selector, constructor, options) => {
    options = options ?? {};

    await expect(
      await elementInteractions.textContent(selector),
    ).not.toBeInstanceOf(constructor, options);
  },
  shouldNotBeLessThan: async (selector, expected, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).not.toBeLessThan(expected, options);
  },
  shouldNotBeLessThanOrEqual: async (selector, expected, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).not.toBeLessThanOrEqual(expected, options);
  },
  shouldNotBeNaN: async (selector, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).not.toBeNaN(options);
  },
  shouldNotBeNull: async (selector, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).not.toBeNull(
      options,
    );
  },
  shouldNotBeTruthy: async (selector, options) => {
    options = options ?? {};

    await expect(
      await elementInteractions.textContent(selector),
    ).not.toBeTruthy(options);
  },
  shouldNotBeUndefined: async (selector, options) => {
    options = options ?? {};

    await expect(
      await elementInteractions.textContent(selector),
    ).not.toBeUndefined(options);
  },
  shouldNotContain: async (selector, substring, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).not.toContain(
      substring,
      options,
    );
  },
  shouldNotContainEqual: async (selector, expected, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).not.toContainEqual(expected, options);
  },
  shouldNotEqual: async (selector, expected, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).not.toEqual(expected, options);
  },
  shouldNotHaveLength: async (selector, length, options) => {
    options = options ?? {};

    await expect(
      await elementInteractions.textContent(selector),
    ).not.toHaveLength(length, options);
  },
  shouldNotHaveProperty: async (selector, property, options) => {
    options = options ?? {};

    await expect(
      await elementInteractions.textContent(selector),
    ).not.toHaveProperty(property, options);
  },
  shouldNotMatch: async (selector, regex, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).not.toMatch(
      regex,
      options,
    );
  },
  shouldNotMatchObject: async (selector, object, options) => {
    options = options ?? {};

    await expect(
      await elementInteractions.textContent(selector),
    ).not.toMatchObject(object, options);
  },
  shouldNotStrictEqual: async (selector, expected, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).not.toStrictEqual(expected, options);
  },
  shouldNotThrow: async (fn, options) => {
    options = options ?? {};

    await expect(fn).not.toThrow(options);
  },
  shouldNotAny: async (selector, constructor, options) => {
    options = options ?? {};

    await expect(
      await elementInteractions.textContent(selector),
    ).any.toBeInstanceOf(constructor, options);
  },
  shouldNotAnything: async (selector, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).not.anything(
      options,
    );
  },
  shouldNotArrayContaining: async (selector, elements, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).not.toEqual(
      expect.arrayContaining(elements),
      options,
    );
  },
  shouldNotCloseTo: async (selector, expected, precision, options) => {
    options = options ?? {};

    await expect(
      Number(await elementInteractions.textContent(selector)),
    ).not.toBeCloseTo(expected, precision, options);
  },
  shouldNotObjectContaining: async (selector, properties, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).not.toEqual(
      expect.objectContaining(properties),
      options,
    );
  },
  shouldNotStringContaining: async (selector, substring, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).not.toEqual(
      expect.stringContaining(substring),
      options,
    );
  },
  shouldNotStringMatching: async (selector, regex, options) => {
    options = options ?? {};

    await expect(await elementInteractions.textContent(selector)).not.toEqual(
      expect.stringMatching(regex),
      options,
    );
  },
};

module.exports = { assert };
