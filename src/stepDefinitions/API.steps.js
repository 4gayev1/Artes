const {
  When,
  context,
  extractVarsFromResponse,
  saveVar,
  time,
  random,
} = require("../helper/imports/commons");
const { api } = require("../helper/stepFunctions/exporter");

When("User sends GET request to {string}", async function (url) {
  await api.get(url);
});

When(
  "User sends GET request to {string} with payload:",
  async function (url, payload) {
    await api.get(url, payload);
  },
);

When(
  "User sends GET request to {string} and saves {string} variables",
  async function (url, vars) {
    await api.get(url);
    await extractVarsFromResponse(context.response["Response Body"], vars);
  },
);

When(
  "User sends GET request to {string} with payload and saves {string} variables",
  async function (url, vars, payload) {
    await api.get(url, payload);
    await extractVarsFromResponse(context.response["Response Body"], vars);
  },
);

When("User sends HEAD request to {string}", async function (url) {
  await api.head(url);
});

When(
  "User sends POST request to {string} with payload:",
  async function (url, payload) {
    await api.post(url, payload);
  },
);

When(
  "User sends POST request to {string} with payload and saves {string} variables",
  async function (url, vars, payload) {
    await api.post(url, payload);
    await extractVarsFromResponse(context.response["Response Body"], vars);
  },
);

When(
  "User sends multipart POST request to {string} with payload:",
  async (url, payload) => {
    await api.post(url, payload, "multipart");
  },
);

When(
  "User sends multipart POST request to {string} with payload and saves {string} variables",
  async (url, vars, payload) => {
    await api.post(url, payload, "multipart");
    await extractVarsFromResponse(context.response["Response Body"], vars);
  },
);

When(
  "User sends x-www-form-urlencoded POST request to {string} with payload:",
  async (url, payload) => {
    await api.post(url, payload, "application/x-www-form-urlencoded");
  },
);

When(
  "User sends x-www-form-urlencoded POST request to {string} with payload and saves {string} variables",
  async (url, vars, payload) => {
    await api.post(url, payload, "application/x-www-form-urlencoded");
    await extractVarsFromResponse(context.response["Response Body"], vars);
  },
);

When(
  "User sends PUT request to {string} with payload:",
  async function (url, payload) {
    await api.put(url, payload);
  },
);

When(
  "User sends PUT request to {string} with payload and saves {string} variables",
  async function (url, vars, payload) {
    await api.put(url, payload);
    await extractVarsFromResponse(context.response["Response Body"], vars);
  },
);

When(
  "User sends multipart PUT request to {string} with payload:",
  async function (url, payload) {
    await api.put(url, payload, "multipart");
  },
);

When(
  "User sends multipart PUT request to {string} with payload and saves {string} variables",
  async function (url, vars, payload) {
    await api.put(url, payload, "multipart");
    await extractVarsFromResponse(context.response["Response Body"], vars);
  },
);

When(
  "User sends x-www-form-urlencoded PUT request to {string} with payload:",
  async (url, payload) => {
    await api.put(url, payload, "application/x-www-form-urlencoded");
  },
);

When(
  "User sends x-www-form-urlencoded PUT request to {string} with payload and saves {string} variables",
  async (url, vars, payload) => {
    await api.put(url, payload, "application/x-www-form-urlencoded");
    await extractVarsFromResponse(context.response["Response Body"], vars);
  },
);

When(
  "User sends PATCH request to {string} with payload:",
  async function (url, payload) {
    await api.patch(url, payload);
  },
);

When(
  "User sends PATCH request to {string} with payload and saves {string} variables",
  async function (url, vars, payload) {
    await api.patch(url, payload);
    await extractVarsFromResponse(context.response["Response Body"], vars);
  },
);

When(
  "User sends multipart PATCH request to {string} with payload:",
  async function (url, payload) {
    await api.patch(url, payload, "multipart");
  },
);

When(
  "User sends multipart PATCH request to {string} with payload and saves {string} variables",
  async function (url, vars, payload) {
    await api.patch(url, payload, "multipart");
    await extractVarsFromResponse(context.response["Response Body"], vars);
  },
);

When(
  "User sends x-www-form-urlencoded PATCH request to {string} with payload:",
  async (url, payload) => {
    await api.patch(url, payload, "application/x-www-form-urlencoded");
  },
);

When(
  "User sends x-www-form-urlencoded PATCH request to {string} with payload and saves {string} variables",
  async (url, vars, payload) => {
    await api.patch(url, payload, "application/x-www-form-urlencoded");
    await extractVarsFromResponse(context.response["Response Body"], vars);
  },
);

When("User sends DELETE request to {string}", async function (url) {
  await api.delete(url);
});

When(
  "User sends DELETE request to {string} and saves {string} variables",
  async function (url, vars) {
    await api.delete(url);
    await extractVarsFromResponse(context.response["Response Body"], vars);
  },
);

When(
  "User sends DELETE request to {string} with payload:",
  async function (url, payload) {
    await api.delete(url, payload);
  },
);

When(
  "User sends DELETE request to {string} with payload and saves {string}",
  async function (url, vars, payload) {
    await api.delete(url, payload);
    await extractVarsFromResponse(context.response["Response Body"], vars);
  },
);

When(
  "User saves {string} variable from response as {string}",
  async function (vars, customVarName) {
    await extractVarsFromResponse(
      context.response["Response Body"],
      vars,
      customVarName,
    );
  },
);

When(
  "User saves {string} variable as {string}",
  async function (value, customVarName) {
    saveVar(value, customVarName);
  },
);

When("User wants to see saved variables", async function () {
  console.log("\nVariables:", api.vars(), "\n");
});

When("User wants to see request body", async function () {
  console.log("Request Body: ", context.response["Request Body"]);
});

When("User wants to see response body", async function () {
  console.log("Response Body: ", context.response["Response Body"]);
});

When(
  "User sends {string} request to {string}",
  async function (method, url, reqParams) {
    const httpMethod = method.toUpperCase();

    let headers = {};
    let body;

    if (["POST", "PUT", "PATCH"].includes(httpMethod)) {
      const payload = JSON.parse(reqParams);
      headers = payload.headers || {};
      body = payload.body || {};
    }

    switch (httpMethod) {
      case "GET":
        await api.get(url);
        break;
      case "HEAD":
        await api.head(url);
        break;
      case "POST":
        await api.post(url, headers, body);
        break;
      case "PUT":
        await api.put(url, headers, body);
        break;
      case "PATCH":
        await api.patch(url, headers, body);
        break;
      case "DELETE":
        await api.delete(url);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${httpMethod}`);
    }
  },
);

When(
  "User sends GET request to {string} and save {string} variable from {string} array as {string} randomly with payload:",
  async (endPoint, varName, fromArray, variableKey, payload) => {
    await api.get(endPoint, payload);
    let responseBody;
    if (fromArray == "[]") {
      responseBody = await context.response["Response Body"];
    } else {
      responseBody = await context.response["Response Body"][fromArray];
    }
    const randomContent =
      responseBody[random.number.int({ min: 0, max: responseBody.length - 1 })];
    context.vars[variableKey] = randomContent[varName];
  },
);

When(
  "User sets {string} date {int} days from today",
  async function (dateName, days) {
    const expiresAt =
      days < 0
        ? time().subtract(Math.abs(days), "day").toISOString()
        : time().add(days, "day").toISOString();

    context.vars[dateName] = expiresAt;
  },
);
