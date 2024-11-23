const { request } = require("playwright");

const requestContextOptions = {};

async function invokeRequest() {
  const context = await request.newContext(requestContextOptions);
  return await context;
}

module.exports = { invokeRequest };
