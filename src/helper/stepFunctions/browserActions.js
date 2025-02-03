const { context, element } = require("../imports/commons");

const browser = {
  setCookies: async (cookies) => {
    let cookieData;

  try {
    cookieData = JSON.parse(cookies);
  } catch {
    cookieData = element(cookies);
  }

  cookieData = Array.isArray(cookieData) ? cookieData : [cookieData];

  await context.browser.addCookies(cookieData);
  },
};

module.exports = {
  browser
};
