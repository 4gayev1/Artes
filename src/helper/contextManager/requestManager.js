const { request } = require("playwright");
const cucumberConfig = require("../../../cucumber.config.js");

let baseURL = "";

if (typeof cucumberConfig.baseURL === "object") {
  if (
    cucumberConfig.env != "" ||
    cucumberConfig.env != undefined ||
    cucumberConfig.env != null
  ) {
    baseURL = cucumberConfig.baseURL[cucumberConfig.env.trim()];
  } else {
    baseURL =
      cucumberConfig.baseURL[Object.keys(cucumberConfig.baseURL)[0].trim()];
  }
} else {
  baseURL = cucumberConfig.baseURL;
}

const requestContextOptions = {
  baseURL: baseURL,
  ignoreHTTPSErrors: true
};

async function invokeRequest() {
  const context = await request.newContext(requestContextOptions);
  return context;
}

module.exports = { invokeRequest };
