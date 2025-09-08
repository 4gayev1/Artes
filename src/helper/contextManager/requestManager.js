const { request } = require("playwright");
const cucumberConfig = require("../../../cucumber.config.js");

let baseURL = "";

if (typeof cucumberConfig.baseURL === "object") {
  const env = (cucumberConfig.env || "").trim();
  if (env && cucumberConfig.baseURL.hasOwnProperty(env)) {
    baseURL = cucumberConfig.baseURL[env];
  } else {
    const firstKey = Object.keys(cucumberConfig.baseURL)[0];
    baseURL = cucumberConfig.baseURL[firstKey];
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
