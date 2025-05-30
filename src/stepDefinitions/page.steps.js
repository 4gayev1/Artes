const { When, context, selector } = require("../helper/imports/commons");
const { page, assert, mouse } = require("../helper/stepFunctions/exporter");

When("User navigates to {string} page", async function (url) {
  const URL = await selector(url);
  await page.navigateTo(URL);
});

When("User is on {string} page", async function (url) {
  const URL = await selector(url);
  await assert.shouldPageHaveURL(URL);
});

When("User navigates previous page", async function () {
  await page.navigateBack();
});

When("User navigates next page", async function () {
  await page.navigateForward();
});

When("User gets URL of page", async function () {
  await page.getURL();
});

When("User reloads the page", async function () {
  await page.reload();
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

When("User clicks {string} and confirms alert", async (button) => {
  context.page.on("dialog", async (dialog) => {
    await dialog.accept();
  });
  await mouse.click(button);
});

When("User clicks {string} and confirms popup", async (button) => {
  context.page.on("dialog", async (dialog) => {
    await dialog.accept();
  });
  await mouse.click(button);
});

When("User clicks {string} and dismisses popup", async (button) => {
  context.page.on("dialog", async (dialog) => {
    await dialog.dismiss();
  });
  await mouse.click(button);
});

When(
  "User clicks {string} and types {string} in prompt",
  async (button, prompt) => {
    context.page.on("dialog", async (dialog) => {
      await dialog.accept(prompt);
    });
    await mouse.click(button);
  },
);
