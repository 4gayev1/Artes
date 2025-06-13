const { context, selector, resolveVariable } = require("../imports/commons");

const browser = {
  setCookies: async (cookies) => {
    cookies = await resolveVariable(cookies);

    let cookieData;
    try {
      cookieData = JSON.parse(cookies);
    } catch {
      cookieData = selector(cookies);
    }

    cookieData = Array.isArray(cookieData) ? cookieData : [cookieData];
    await context.browserContext.addCookies(cookieData);
  },
};

module.exports = {
  browser,
};