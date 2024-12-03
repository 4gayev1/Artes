const { context, selector } = require("../imports/commons");

const page = {
  navigateTo: async (url) => {
    url = selector(url);
    return await context.page.goto(url);
  },
  getURL: async () => {
    return await context.page.url();
  },
  navigateBack: async () => {
    return await context.page.goBack();
  },
  navigateForward: async () => {
    return await context.page.goForward();
  },
  reload: async () => {
    page.reload();
  },
  wait: async (time) => {
    return await context.page.waitForTimeout(time);
  },
};

module.exports = {
  page,
};
