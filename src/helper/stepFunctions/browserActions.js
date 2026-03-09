const { page: p } = require("artes/src/helper/stepFunctions/pageActions");
const {
  context,
  resolveVariable,
  expect,
  selector,
} = require("../imports/commons");
const { AxeBuilder } = require("@axe-core/playwright");
const {
  validateWCAGTags,
} = require("artes/src/helper/controller/validateWCAGTags ");
require("allure-cucumberjs");
const allure = require("allure-js-commons");

const browser = {
  setCookies: async (cookies) => {
    cookies = await resolveVariable(cookies);

    let cookieData;
    try {
      cookieData = JSON.parse(cookies);
    } catch {
      cookieData = selector(cookies);
    }

    cookieData = Array.isArray(cookieData) ? cookieData : [cookieData];

    await context.browserContext.addCookies(cookieData);
  },
  checkAccessibilityOfPage: async (page, url, element) => {
    if (url) {
      await p.navigateTo(url);
    }

    if (element) {
      element = await selector(element);
      await page.locator(element).waitFor();
    }

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include(element)
      .analyze();
    await allure.attachment(
      "Accessibility Results",
      JSON.stringify(accessibilityScanResults, null, 2),
      "application/json",
    );

    try {
      expect(accessibilityScanResults.violations).toEqual([]);
    } catch (e) {
      e.name = "AssertionError";
      throw e;
    }
  },
  checkAccessibilityOfPageDueToWCAG: async (page, url, element, tags) => {
    if (url) {
      await p.navigateTo(url);
    }

    if (element) {
      element = await selector(element);
      await page.locator(element).waitFor();
    }
    if (tags) {
      tags = validateWCAGTags(tags);
    }

    expect(accessibilityScanResults.violations).toEqual([]);
    await allure.attachment(
      "Accessibility Results",
      JSON.stringify(accessibilityScanResults, null, 2),
      "application/json",
    );

    try {
      expect(accessibilityScanResults.violations).toEqual([]);
    } catch (e) {
      e.name = "AssertionError";
      throw e;
    }
  },
};

module.exports = {
  browser,
};
