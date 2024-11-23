const { context } = require("../imports/commons");

const page = {
  navigateTo: async (url) => {
    return await context.page.goto(url);
  },
  getURL: async () => {
    return await context.page.url();
  },
};

module.exports = {
  page,
};
