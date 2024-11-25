const { context } = require("../imports/commons");

const page = {
  navigateTo: async (url) => {
    return await context.page.goto(url);
  },
  getURL: async () => {
    return await context.page.url();
  },
  navigateBack:async () => {
    return await context.page.goBack();
  },
  navigateForward:async () => {
    return await context.page.goForward();
  },
  wait: async (time) => {
    return await context.page.waitForTimeout(time);
  },
};

module.exports = {
  page,
};
