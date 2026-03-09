const { When, context } = require("../helper/imports/commons");
const { browser } = require("../helper/stepFunctions/exporter");

// User sets cookies in json format
When("User sets {string} cookies", async function (cookies) {
  await browser.setCookies(cookies);
});

When("User checks accessibility of current page", async function () {
  await browser.checkAccessibilityOfPage(context.page, null, null);
});

When("User checks accessibility of {string} page", async function (url) {
  await browser.checkAccessibilityOfPage(context.page, url, null);
});

When("User checks accessibility of {string} element", async function (element) {
  await browser.checkAccessibilityOfPage(context.page, null, element);
});

When(
  "User checks accessibility of {string} element on the {string} page",
  async function (element, url) {
    await browser.checkAccessibilityOfPage(context.page, url, element);
  },
);

When(
  "User checks accessibility of current page due to {string} WCAG",
  async function (wcag) {
    await browser.checkAccessibilityOfPageDueToWCAG(
      context.page,
      null,
      null,
      wcag,
    );
  },
);

When(
  "User checks accessibility of {string} page due to {string} WCAG",
  async function (url, wcag) {
    await browser.checkAccessibilityOfPageDueToWCAG(
      context.page,
      url,
      null,
      wcag,
    );
  },
);

When(
  "User checks accessibility of {string} element due to {string} WCAG",
  async function (element, wcag) {
    await browser.checkAccessibilityOfPageDueToWCAG(
      context.page,
      null,
      element,
      wcag,
    );
  },
);

When(
  "User checks accessibility of {string} element on the {string} page due to {string} WCAG",
  async function (element, url, wcag) {
    await browser.checkAccessibilityOfPageDueToWCAG(
      context.page,
      url,
      element,
      wcag,
    );
  },
);
