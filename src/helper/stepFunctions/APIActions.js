const { context } = require("../imports/commons");

const api = {
  get: async (url) => {
    return await context.request.get(url);
  },
  head: async (url) => {
    return await context.request.head(url);
  },
  post: async (url) => {
    return await context.request.post(url);
  },
  put: async (url) => {
    return await context.request.put(url);
  },
  patch: async (url) => {
    return await context.request.patch(url);
  },
  delete: async (url) => {
    return await context.request.head(url);
  },
};

module.exports = { api };
