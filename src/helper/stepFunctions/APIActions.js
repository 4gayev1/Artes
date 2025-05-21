const { context } = require("../imports/commons");

const api = {
  get: async (url) => {
    const res = await context.request.get(url);
    const header = await res.headers();
    const body = await res.json();

    const response = {
      url: res.url(),
      response: res,
      responseHeaders: header,
      responseBody: body,
    };

    context.response = response;
  },
  head: async (url) => {
    const res = await context.request.head(url);
    const header = await res.headers();

    const response = {
      url: res.url(),
      response: res,
      responseHeaders: header,
      responseBody: body,
    };

    context.response = response;
  },
  post: async (url, reqHeader, reqBody) => {
    const res = await context.request.post(url, {
      headers: reqHeader,
      body: reqBody,
    });
    const header = await res.headers();
    const body = await res.json();

    const response = {
      url: res.url(),
      requestHeaders: reqHeader,
      requestBody: reqBody,
      response: res,
      responseHeaders: header,
      responseBody: body,
    };

    context.response = response;
  },
  put: async (url, reqHeader, reqBody) => {
    const res = await context.request.put(url, {
      body: JSON.stringify(reqBody),
    });
    const header = await res.headers();
    const body = await res.json();

    const response = {
      url: res.url(),
      requestHeaders: reqHeader,
      requestBody: reqBody,
      response: res,
      responseHeaders: header,
      responseBody: body,
    };

    context.response = response;
  },
  patch: async (url, reqHeader, reqBody) => {
    const res = await context.request.patch(url, {
      body: JSON.stringify(reqBody),
    });
    const header = await res.headers();
    const body = await res.json();

    const response = {
      url: res.url(),
      requestHeaders: reqHeader,
      requestBody: reqBody,
      response: res,
      responseHeaders: header,
      responseBody: body,
    };

    context.response = response;
  },
  delete: async (url) => {
    const res = await context.request.delete(url);
    const header = await res.headers();
    const body = await res.json();

    const response = {
      url: res.url(),
      response: res,
      responseHeaders: header,
      responseBody: body,
    };

    context.response = response;
  },
};

module.exports = { api };
