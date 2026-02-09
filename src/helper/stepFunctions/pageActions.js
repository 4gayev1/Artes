const { context, selector, resolveVariable } = require("../imports/commons");

const page = {
  navigateTo: async (url, options) => {
    options = options ?? {};

    url = await resolveVariable(url);
    url = await selector(url);

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

    time = await resolveVariable(time);

    return await context.page.waitForTimeout(time, options);
  },
};

module.exports = {
  page,
};
