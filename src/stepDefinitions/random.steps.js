const { Given, context, random } = require("../helper/imports/commons");
const { api } = require("../helper/stepFunctions/exporter");

Given("User sets random word as {string}", async (key) => {
  const word = random.lorem.word();
  context.vars[key] = word;
});

Given(
  "User sets random word that has {int} character as {string}",
  async (key, count) => {
    const word = random.lorem.word(count);
    context.vars[key] = word;
  },
);

Given(
  "User sets random word that has character between {int} and {int} as {string}",
  async (key, from, to) => {
    const word = random.lorem.word({ length: { min: from, max: to } });
    context.vars[key] = word;
  },
);

Given("User sets random words as {string}", async (key) => {
  const words = random.lorem.words();
  context.vars[key] = words;
});

Given(
  "User sets random {int} words as {string}",
  async (key, count) => {
    const words = random.lorem.words({ wordCount: count });
    context.vars[key] = words;
  },
);

Given(
  "User sets random words that range between {int} and {int} as {string}",
  async (key, from, to) => {
    const words = random.lorem.words({ min: from, max: to });
    context.vars[key] = words;
  },
);

Given(
  "User sets random number from {int} to {int} as {string}",
  async (from, to, key) => {
    const number = random.number.int({ min: from, max: to });
    context.vars[key] = number;
  },
);

Given(
  "User sends GET request to {string} and save {string} variable from {string} array as {string} randomly",
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

Given("User sets email as {string}", (key) => {
  const email = random.internet.email();
  context.vars[key] = email;
});

Given('User sets random url as {string}', (urlName) => {
  const randomUrl = random.internet.url();
  context.vars[urlName] = randomUrl;
})

Given('User sets random sentences that has {int} paragraph as {string}', (count, variable) => {
  const sentences = random.lorem.paragraph(count);
  context.vars[variable] = sentences;
})

Given("User sets random value from given {string} array as {string}", async (array, key) => {
  const parsedArray = JSON.parse(array.replace(/'/g, '"'));
  const randomValue = parsedArray[Math.floor(Math.random() * parsedArray.length)];
  context.vars[key] = randomValue;
});