const { When, context } = require("../../helper/imports/commons");
const { page } = require("../../helper/stepFunctions/actionCommons");

When("User navigates to {string} page", async function (url) {
  await page.navigateTo(url);
});

// When("User is on {string} page", async function (url) {
//   await page.navigateTo(url);
// });

When("User gets URL of page", async function () {
  await page.getURL();
});

When("User gets URL of page", async function () {
  await page.getURL();
});

When(`User waits {int} seconds`, async (sec) => {
  await context.page.waitForTimeout(sec * 1000);
});

When(`User waits {int} milliseconds`, async (sec) => {
  await context.page.waitForTimeout(sec);
});

When(`User waits {int} minutes`, async (sec) => {
  await context.page.waitForTimeout(sec * 1000 * 60);
});
