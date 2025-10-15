const { Given, context, random, time } = require("../helper/imports/commons");
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
  async (from, to, key) => {
    const word = random.lorem.word({ min: from, max: to });
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
  async (from, to, key) => {
    const words = random.lorem.words({ min: from, max: to });
    context.vars[key] = words;
  },
);

Given('User sets random number as {string}', async (key) => {
  const randomNumber = random.number.int();
  context.vars[key] = randomNumber;
});

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

Given("User sets random email as {string}", (key) => {
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

Given('User sets random paragraph as {string}', async (key) => {
  const randomParagraph = random.lorem.paragraph();
  context.vars[key] = randomParagraph;
});

Given(
"User sets random paragraph that range between {int} and {int} as {string}",
async (from, to, key) => {
  const words = random.lorem.paragraph({ min: from, max: to });
  context.vars[key] = words;
},
);

Given('User sets random characters from {string} as {string}', async (chars, key) => {
      const randomCharacters = random.string.fromCharacters(chars,10);
      context.vars[key] = randomCharacters;
    })

Given('User sets random alphanumeric in range from {int} to {int} as {string}', async (from,to, key) => {
  const randomWords = await random.string.alphanumeric({ min: from, max: to })
  context.vars[key] = randomWords;
})

Given('User sets random fullname as {string}', async (key) => {
  const randomFirstName = await random.person.firstName()
  const randomLastName = await random.person.lastName()
  context.vars[key] = `${randomFirstName} ${randomLastName}`
})

Given('User sets random first name as {string}', async (key) => {
  const randomFirstName = await random.person.firstName()
  context.vars[key] = randomFirstName;
})

Given('User sets random last name as {string}', async (key) => {
  const randomLastName = await random.person.lastName()
  context.vars[key] = randomLastName;
})

Given('User sets random middle name as {string}', async (key) => {
  const randomMiddleName = await random.person.middleName()
  context.vars[key] = randomMiddleName;
})

Given('User sets random date between {int} and {int} as {string}', async (fromYear, toYear, key) => {
  const year = Math.floor(Math.random() * (toYear - fromYear + 1)) + fromYear
  const month = Math.floor(Math.random() * 12) + 1
  const day = Math.floor(Math.random() * 28) + 1
  const pad = (num) => num.toString().padStart(2, '0')
  const dateStr = `${pad(day)}.${pad(month)}.${year}`
  context.vars[key] = dateStr;
})

Given('User sets date {int} days after today as {string}', async (day, key) => {
  const now = new time();
  const afterDate = now.add(day, 'day').format("DD-MM-YYYY");
  context.vars[key] = afterDate;
})

Given('User sets date {int} days before today as {string}', async (day, key) => {
  const now = new time();
  const beforeDate = now.subtract(day, 'day').format("DD-MM-YYYY");
  context.vars[key] = beforeDate;
})