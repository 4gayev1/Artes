const { context } = require("../imports/commons");

const browser = {
  setCookies: async (cookies) => {
    await context.browser.addCookies([JSON.parse(cookies)]);
  },
};

module.exports = {
  browser,
};
