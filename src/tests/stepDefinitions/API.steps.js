const { context } = require("../../helper/imports/commons");
const { api, assert } = require("../../helper/stepFunctions/exporter");

When("User sends GET request to {url}", async function (url) {
  await api.get(url);
});

When("User sends HEAD request to {url}", async function (url) {
  await api.get(url);
});

When("User sends POST request to {url}", async function (url) {
  await api.get(url);
});

When("User sends PUT request to {url}", async function (url) {
  await api.get(url);
});

When("User sends PATCH request to {url}", async function (url) {
  await api.get(url);
});

When("User sends DELETE request to {url}", async function (url) {
  await api.get(url);
});
