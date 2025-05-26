const { context, selector, resolveVariable } = require("../imports/commons");

const api = {
  get: async (url, payload) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    const res = await context.request.get(resolvedURL, {
      headers: payloadJSON ? payloadJSON.headers : {},
    });
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
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const res = await context.request.head(resolvedURL);
    const header = await res.headers();

    const response = {
      url: res.url(),
      response: res,
      responseHeaders: header,
      responseBody: body,
    };

    context.response = response;
  },
  post: async (url, payload) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = await resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    const res = await context.request.post(resolvedURL, {
      headers: payloadJSON ? payloadJSON.headers : {},
      data: payloadJSON ? payloadJSON.body : {},
    });

    const header = await res.headers();
    const body = await res.json();

    const response = {
      url: res.url(),
      requestHeaders: payloadJSON.headers,
      requestBody: payloadJSON.body,
      response: res,
      responseHeaders: header,
      responseBody: body,
    };

    context.response = response;
  },
  put: async (url, payload) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = await resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    const res = await context.request.put(resolvedURL, {
      headers: payloadJSON ? payloadJSON.headers : {},
      data: payloadJSON ? payloadJSON.body : {},
    });

    const header = await res.headers();
    const body = await res.json();

    const response = {
      url: res.url(),
      requestHeaders: payloadJSON.headers,
      requestBody: payloadJSON.body,
      response: res,
      responseHeaders: header,
      responseBody: body,
    };

    context.response = response;
  },
  patch: async (url, payload) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = await resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    const res = await context.request.patch(resolvedURL, {
      headers: payloadJSON ? payloadJSON.headers : {},
      data: payloadJSON ? payloadJSON.body : {},
    });

    const header = await res.headers();
    const body = await res.json();

    const response = {
      url: res.url(),
      requestHeaders: payloadJSON.headers,
      requestBody: payloadJSON.body,
      response: res,
      responseHeaders: header,
      responseBody: body,
    };

    context.response = response;
  },
  delete: async (url, payload) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = await resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    const res = await context.request.delete(resolvedURL, {
      headers: payloadJSON.headers,
    });

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
  vars: () => {
    return context.vars;
  },
};

module.exports = { api };
