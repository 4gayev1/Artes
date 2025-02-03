const { When } = require("../helper/imports/commons");
const { browser } = require("../helper/stepFunctions/exporter");

// User sets cookies in json format
When("User sets {string} cookies", async function (cookies) {
  await browser.setCookies(cookies);
});
