const { Given, context, random } = require("../helper/imports/commons");
const { api } = require("../helper/stepFunctions/exporter");

Given("User sets random word as {string} variable", async (key) => {
  const word = random.lorem.word();
  context.vars[key] = word;
});

Given(
  "User sets random word that has {int} character as {string} variable",
  async (key, count) => {
    const word = random.lorem.word(count);
    context.vars[key] = word;
  },
);

Given(
  "User sets random word that has character between {int} and {int} as {string} variable",
  async (key, from, to) => {
    const word = random.lorem.word({ length: { min: from, max: to } });
    context.vars[key] = word;
  },
);

Given("User sets random words as {string} variable", async (key) => {
  const words = random.lorem.words();
  context.vars[key] = words;
});

Given(
  "User sets random {int} words as {string} variable",
  async (key, count) => {
    const words = random.lorem.words({ wordCount: count });
    context.vars[key] = words;
  },
);

Given(
  "User sets random words that range between {int} and {int} as {string} variable",
  async (key, from, to) => {
    const words = random.lorem.words({ min: from, max: to });
    context.vars[key] = words;
  },
);

Given(
  "User sets random number from {int} to {int} as {string} variable",
  async (from, to, key) => {
    const number = random.number.int({ min: from, max: to });
    context.vars[key] = number;
  },
);

Given(
  "User sends GET request to {string} and save {string} variable from {string} array as a {string} randomly",
  async (endPoint, varName, fromArray, variableKey) => {
    await api.get(endPoint);
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
