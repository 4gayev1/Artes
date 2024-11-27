const { When, context } = require("../../helper/imports/commons");
const { page } = require("../../helper/stepFunctions/exporter");

When("User navigates to {string} page", async function (url) {
  await page.navigateTo(url);
});

// When("User is on {string} page", async function (url) {
//   await page.navigateTo(url);
// });

When("User navigates previous page", async function () {
  await page.navigateBack();
});

When("User navigates next page", async function () {
  await page.navigateForward();
});

When("User gets URL of page", async function () {
  await page.getURL();
});

When(`User waits {int} seconds`, async (sec) => {
  await page.wait(sec * 1000);
});

When(`User waits {int} milliseconds`, async (sec) => {
  await page.wait(sec);
});

When(`User waits {int} minutes`, async (sec) => {
  await page.wait(sec * 1000 * 60);
});
