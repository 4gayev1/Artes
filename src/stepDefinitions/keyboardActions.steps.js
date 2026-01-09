const {
  When,
  random,
  element,
  selector,
  time,
} = require("../helper/imports/commons");
const { keyboard, frame } = require("../helper/stepFunctions/exporter");

// User presses a key on a specific selector
When("User presses {string} on {string}", async function (key, selector) {
  await keyboard.press(selector, key);
});

// User presses keys sequentially on a specific selector
When(
  "User types {string} by hand in {string}",
  async function (keys, selector) {
    await keyboard.pressSequentially(selector, keys);
  },
);

When(
  "User types {string} by hand in {int} th of {string}",
  async (text, order, elements) => {
    const nthElement = await frame.nth(elements, order);
    await nthElement.pressSequentially(text);
  },
);

// User presses keys sequentially with a delay on a specific selector
When(
  "User types {string} by hand with delay {int} in {string}",
  async function (keys, delay, selector) {
    await keyboard.pressSequentiallyDelay(selector, keys, delay);
  },
);

// User fills a value into a specific selector
When("User types {string} in {string}", async function (value, selector) {
  await keyboard.fill(selector, value);
});

When(
  "User types {string} in {int} th of {string}",
  async (text, order, elements) => {
    const nthElement = await frame.nth(elements, order);
    await nthElement.fill(text);
  },
);

When(
  "User types {string} in multiple {string}",
  async function (value, selectors) {
    await keyboard.multipleElementFill(selectors, value);
  },
);

// User clears the input of a specific selector
When("User clears {string}", async function (selector) {
  await keyboard.clear(selector);
});

// User selects text in a specific selector
When("User selects {string} text", async function (text) {
  await keyboard.selectText(text);
});

// User sets input files for a specific selector
When(
  "User sets input files {string} for {string}",
  async function (files, selector) {
    const fileArray = files.split(","); // Assuming files are comma-separated
    await keyboard.setInputFiles(selector, fileArray);
  },
);

// User presses a key down
When("User holds down {string}", async function (key) {
  await keyboard.keyDown(key);
});

// User releases a key
When("User releases {string}", async function (key) {
  await keyboard.keyUp(key);
});

// User inserts text
When("User inserts text {string}", async function (text) {
  await keyboard.insertText(text);
});

// User presses a key
When("User presses {string}", async function (key) {
  await keyboard.keyboardPress(key);
});

// User types a key with a delay
When("User types {string} with delay {int}", async function (key, delay) {
  await keyboard.keyboardType(key, delay);
});

When("User types random word in {string}", async (input) => {
  const randomWord = random.lorem.word();
  await keyboard.fill(input, randomWord);
});

When(
  "User types random word that has character between {int} and {int} in {string}",
  async (from, to, input) => {
    const randomWord = random.lorem.word({ min: from, max: to });
    await keyboard.fill(input, randomWord);
  },
);

When("User types random words in {string}", async (input) => {
  const randomWord = random.lorem.words();
  await keyboard.fill(input, randomWord);
});

When(
  "User types random words that range between {int} and {int} in {string}",
  async (from, to, input) => {
    const words = random.lorem.words({ min: from, max: to });
    await keyboard.fill(input, words);
  },
);

When("User types random paragraph in {string}", async (input) => {
  const randomParagraph = random.lorem.paragraph();
  await keyboard.fill(input, randomParagraph);
});

When(
  "User types random paragraph that range between {int} and {int} in {string}",
  async (from, to, input) => {
    const words = random.lorem.paragraph({ min: from, max: to });
    await keyboard.fill(input, words);
  },
);

When("User types random url in {string}", async (input) => {
  const randomURL = random.internet.url();
  await keyboard.fill(input, randomURL);
});

When("User types random number in {string}", async (input) => {
  const randomNumber = random.number.int();
  await keyboard.fill(input, randomNumber.toString());
});

When(
  "User types random number that range between {int} and {int} in {string}",
  async (from, to, input) => {
    const randomNumber = random.number.int({ min: from, max: to });
    await keyboard.fill(input, randomNumber.toString());
  },
);

When("User types random email in {string}", async (key) => {
  const email = random.internet.email();
  await keyboard.fill(key, email);
});

When("User types random word in {int} th of {string}", async (th, inputs) => {
  const nthElement = await frame.nth(th, inputs);
  const randomWord = random.lorem.word();
  await nthElement.fill(randomWord);
});

When(
  "User types random word that has character between {int} and {int} in {int} th of {string}",
  async (from, to, th, inputs) => {
    const nthElement = await frame.nth(th, inputs);
    const randomWord = random.lorem.word({ min: from, max: to });
    await nthElement.fill(randomWord);
  },
);

When(
  "User types random characters from {string}  in {string}",
  async (chars, input) => {
    const randomCharacters = random.string.fromCharacters(chars, 10);
    input = await element(selector(input));
    await input.fill(randomCharacters);
  },
);

When(
  "User types random number by hand in range from {int} to {int} in {string} with {int} ms delay",
  async (from, to, input, delay) => {
    const randomNumber = Math.floor(Math.random() * (to - from + 1)) + from;
    await keyboard.pressSequentiallyDelay(
      input,
      randomNumber.toString(),
      delay,
    );
  },
);

When(
  "User types random alphanumeric in range from {int} to {int} in {string}",
  async (from, to, input) => {
    const randomWords = await random.string.alphanumeric({
      length: { min: from, max: to },
    });
    await element(input).fill(randomWords);
  },
);

When("User types random fullname in {string}", async (input) => {
  const randomFirstName = await random.person.firstName();
  const randomLastName = await random.person.lastName();

  await element(input).fill(`${randomFirstName} ${randomLastName}`);
});

When("User types random first name in {string}", async (input) => {
  const randomFirstName = await random.person.firstName();
  await element(input).fill(randomFirstName);
});

When("User types random last name in {string}", async (input) => {
  const randomLastName = await random.person.lastName();
  await element(input).fill(randomLastName);
});

When("User types random middle name in {string}", async (input) => {
  const randomMiddleName = await random.person.middleName();
  await element(input).fill(randomMiddleName);
});

When(
  "User types random date between {int} and {int} in {string}",
  async (fromYear, toYear, input) => {
    const year = Math.floor(Math.random() * (toYear - fromYear + 1)) + fromYear;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const pad = (num) => num.toString().padStart(2, "0");
    const dateStr = `${pad(day)}.${pad(month)}.${year}`;
    await element(input).fill(dateStr);
  },
);

When(
  "User types date {int} days after today in {string}",
  async (day, input) => {
    const now = new time();
    const afterDate = now.add(day, "day").format("DD-MM-YYYY");
    await element(input).fill(afterDate);
  },
);

When(
  "User types date {int} days before today in {string}",
  async (day, input) => {
    const now = new time();
    const beforeDate = now.subtract(day, "day").format("DD-MM-YYYY");
    await element(input).fill(beforeDate);
  },
);
