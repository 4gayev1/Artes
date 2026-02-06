const { context, selector } = require("../imports/commons");

const page = {
  navigateTo: async (url, options) => {
    options = options ?? {};

    url = selector(url);
    return await context.page.goto(url, options);
  },
  getURL: async (options) => {
    options = options ?? {};

    return await context.page.url(options);
  },
  navigateBack: async (options) => {
    options = options ?? {};

    return await context.page.goBack(options);
  },
  navigateForward: async (options) => {
    options = options ?? {};

    return await context.page.goForward(options);
  },
  reload: async (options) => {
    options = options ?? {};

    return await context.page.reload(options);
  },
  wait: async (time, options) => {
    options = options ?? {};

    return await context.page.waitForTimeout(time, options);
  },
};

module.exports = {
  page,
};
