const { When, context } = require("../helper/imports/commons");
const { api, assert } = require("../helper/stepFunctions/exporter");

When("User sends GET request to {string}", async function (url) {
  await api.get(url);
});

When("User sends HEAD request to {string}", async function (url) {
  await api.get(url);
});

When("User sends POST request to {string}", async function (url) {
  await api.get(url);
});

When("User sends PUT request to {string}", async function (url) {
  await api.get(url);
});

When("User sends PATCH request to {string}", async function (url) {
  await api.get(url);
});

When("User sends DELETE request to {string}", async function (url) {
  await api.get(url);
});
