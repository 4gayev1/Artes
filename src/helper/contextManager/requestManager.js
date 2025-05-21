const { request } = require("playwright");
const cucumberConfig = require("../../../cucumber.config.js");

const requestContextOptions = {
  baseURL: cucumberConfig.api.baseURL,
};

async function invokeRequest() {
  const context = await request.newContext(requestContextOptions);
  return context;
}

module.exports = { invokeRequest };
