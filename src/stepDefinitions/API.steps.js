const {
  When,
  context,
  extractVarsFromResponse,
  saveVar,
  time,
  random,
  moduleConfig,
  resolveVariable,
  normalizeCrossplatformPath
} = require("../helper/imports/commons");
const { api } = require("../helper/stepFunctions/exporter");
const path = require("path");
const fs = require("fs");
require("allure-cucumberjs");
const allure = require("allure-js-commons");


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
  "User sends xml POST request to {string} with payload:",
  async (url, payload) => {
    await api.post(url, payload, "xml");
  },
);

When(
  "User sends xml POST request to {string} with payload and saves {string} variables",
  async (url, vars, payload) => {
    await api.post(url, payload, "xml");
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
  "User sends xml PUT request to {string} with payload:",
  async (url, payload) => {
    await api.put(url, payload, "xml");
  },
);

When(
  "User sends xml PUT request to {string} with payload and saves {string} variables",
  async (url, vars, payload) => {
    await api.put(url, payload, "xml");
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

When(
  "User sends xml PATCH request to {string} with payload:",
  async (url, payload) => {
    await api.patch(url, payload, "xml");
  },
);

When(
  "User sends xml PATCH request to {string} with payload and saves {string} variables",
  async (url, vars, payload) => {
    await api.patch(url, payload, "xml");
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
  "User sends xml DELETE request to {string} with payload:",
  async (url, payload) => {
    await api.delete(url, payload, "xml");
  },
);

When(
  "User sends xml DELETE request to {string} with payload and saves {string} variables",
  async (url, vars, payload) => {
    await api.delete(url, payload, "xml");
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

  When(
  'User sets {int} year from current year as {string}',
  async function (year, yearName) {
    const targetYear = time().add(year, 'year').year();
    context.vars[yearName] = targetYear.toString();
  }
);

When(
  'User sets {int} month from current month as {string}',
  async function (month, monthName) {
    const targetMonth = time().add(month, 'month').month() + 1;

    context.vars[monthName] = targetMonth.toString().padStart(2, '0');
  }
);

When(
  "User saves request time in ISO format as {string}",
  async (request_time) => {
    context.vars[request_time] = new Date(
      context.response["Response Headers"].date,
    ).toISOString();
    allure.attachment("Request Time", context.vars[request_time], "text/plain");
  },
);

When("User wants to see saved variables", async function () {
  console.log("\nVariables:", api.vars(null), "\n");
});

When("User wants to see {string} variable", async function (variable) {
  console.log(api.vars(variable), "\n");
});

When("User wants to see request body", async function () {
  console.log("Request Body: ", context.response["Request Body"]);
});

When("User wants to see response body", async function () {
  console.log("Response Body: ", context.response["Response Body"]);
});

When(
  "User sends {string} request to {string} with payload:",
  async function (method, url, payload) {
    const httpMethod = method.toUpperCase();

    switch (httpMethod) {
      case "GET":
        await api.get(url, payload);
        break;
      case "HEAD":
        await api.head(url, payload);
        break;
      case "POST":
        await api.post(url, payload);
        break;
      case "PUT":
        await api.put(url, payload);
        break;
      case "PATCH":
        await api.patch(url, payload);
        break;
      case "DELETE":
        await api.delete(url, payload);
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

When(
  "User convert {string} into base64 as {string}",
  async (file, variable) => {
    file = await resolveVariable(file);

    const normalizedFile = normalizeCrossplatformPath(file);

    const filePath = path.isAbsolute(normalizedFile)
      ? normalizedFile
      : path.join(moduleConfig.projectPath, normalizedFile);

    const fileData = fs.readFileSync(filePath);
    context.vars[variable] = fileData.toString("base64");
  },
);