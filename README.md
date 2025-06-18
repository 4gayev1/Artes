<p align="center">
  <img alt="artesLogo" src="https://github.com/user-attachments/assets/e0641011-0e96-4330-8ad5-935b395b0838" width="280">
</p>

<h1 align="center">Artes</h1>

## 🚀 Summary

Artes is a test runner for Playwright that executes [predefined Cucumber tests](./docs/stepDefinitions.md) and can generate Allure reports for test results. It simplifies setting up Playwright with Cucumber in your automation workflow. With Artes, you can easily run tests without writing step definitions, generate reports, and customize your testing environment.

![artes demonstration](https://github.com/user-attachments/assets/c46172f7-103d-45d1-a37d-8d4267df0967)

## 🧑‍💻 Installation

You can install **Artes** via npm. To install it globally**(RECOMMENDED)**, run the following command:

```bash
npm install -g artes
```

To install it locally in your project, run:

```bash
npm install artes
```

Once installed, you can run **Artes** using:

```bash
npx artes [options]
```

---

## 💡 Usage

**Artes** has following CLI options:

```bash
npx artes [options]
```

### Options

| Option             | Description                                                                | Usage Example                                                          |
| ------------------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 🆘 `-h, --help`    | Show the usage options                                                     | `artes -h` or `artes --help`                                           |
| 🏷️ `-v, --version` | Show the current version of Artes                                          | `artes -v` or `artes --version`                                        |
| 🏗️ `-c, --create`  | Create an example project with Artes                                       | `artes -c` or `artes --create`                                         |
| ✅ `-y, --yes`     | Skip the confirmation prompt when creating an example project              | `artes -c -y` or `artes --create --yes`                                |
| 📊 `-r, --report`  | Run tests and generate Allure report                                       | `artes -r` or `artes --report`                                         |
| 📁 `--features`    | Specify one or more feature files' relative paths to run (comma-separated) | `artes --features "tests/features/Alma, tests/features/Banan.feature"` |
| 🔖 `--tags`        | Run tests with specified Cucumber tags                                     | `artes --tags "@smoke or @wip"`                                        |
| 🌐 `--env`         | Set the environment for the test run                                       | `artes --env "dev"`                                                    |
| 🕶️ `--headless`    | Run browser in headless mode                                               | `artes --headless`                                                     |
| ⚡ `--parallel`    | Run tests in parallel mode                                                 | `artes --parallel 2`                                                   |
| 🔁 `--retry`       | Retry failed tests                                                         | `artes --retry 3`                                                      |
| 🎭 `--dryrun`      | Perform a dry run without executing tests                                  | `artes --dryrun`                                                       |
| 📈 `--percentage`  | Set minimum success percentage to pass test run(default is 0)                            | `artes --percentage 85`                                                |

\*\* To just run the tests: <br>
Globally: artes <br>
Locally: npx artes

---

## 🎯 Best Practices

- **Global Installation:**  
  For ease of use, it's recommended that Artes be installed globally. You can do this by running the following command:

  ```bash
  npm install -g artes
  ```

- **Project Creation (Recommended):**  
  To create a new project with Artes, use the `-c` flag. This will automatically set up the folder structure and configuration for you. Run the command:

  ```bash
  artes -c
  ```

🗂️ Example Project Structure: <br/>
After running the `-c` flag to create a new project, the structure will look like this:

```
/artes (Project Name)
  /tests
    /features
      (Your feature files here)
    /POMs    // Optional
      (POM JSON file here)
    /steps  // For custom steps
        (Your step definition JS files here)
  artes.config.js
  /report
    (Generated Allure report HTML here)
```

**If you choose not to use the `-c` flag**, you can still download Artes to your testing project and use the prepared steps by running:

```bash
npx artes
```

You must customize the paths of features, steps, and other configurations by editing the `artes.config.js` file located inside your project folder (or create it).

For example:

```javascript
module.exports = {
  paths: ["tests/features/"], // Custom path for feature files
  require: ["tests/steps/*.js"], // Custom path for step definitions files
  pomPath: "tests/POMS/*.js", // Custom path for POM files
};
```

---

## 📝 Writing Feature Files and POM Files

Artes simplifies your test writing with structured feature files and organized Page Object Models (POM). Here’s how you can create them:

### 1. 📄 Feature File Structure

```gherkin
Feature: Searching on Google 🔍
   Scenario Outline: Search for a term on Google
       Given User is on "https://www.google.com/" page
        When User types "alma" in "google_search_input"
         And User clicks "google_search_button"
         And User waits 10 seconds
        Then "google_text" should have "Alma" text
```

- **Feature**: Describes the main feature being tested (e.g., Google search).
- **Scenario Outline**: Defines a test case with steps.
- **Steps**: Use `Given`, `When`, `And`, `Then` keywords to describe actions and expectations.
- **Selectors**: The element names (e.g., `google_search_input`, `google_search_button`) map to the POM file or can be defined directly.

### 2. 📂 POM File Example

```json
{
  "google_search_input": { "selector": "#APjFqb" },
  "google_search_button": {
    "selector": "input.gNO89b"
  },
  "google_text": {
    "selector": "#rso div h3",
    "waitTime": 5 //seconds
  }
}
```

- 📑 Using POM File is optional but it is **RECOMMENDED**
- 🔗 Using Selector in Feature File is possible
  ```gherkin
  When User types "alma" in "#APjFqb"
  ```
- 🐍 It is good to use snake_case for element names
- ⏳ "waitTime" is to define custom wait for elements, but the feature currently under development
  "selector" must be used if "waitTime" is used, but when using only selector is not needed mention in "selector"

---

## 🛠️ Customization

## ✍️ Writing Custom Step Definitions

Artes allows you to extend its functionality by writing custom step definitions. Here's how you can do it:

### Import Required APIs

```javascript
const {
  expect,
  Given,
  When,
  Then,
  element,
  context,
  keyboard,
  mouse,
  frame,
  assert,
  elementInteractions,
} = require("artes"); // Common JS
import { expect, Given, When, Then, element, context } from "artes"; // ES Modules (Do not RECOMMENDED)
```

- **`Given`, `When`, `Then`**: These define your steps in Cucumber syntax. Example:

  ```javascript
  Given("User is on the login page", async () => {
    await context.page.navigateTo("https://example.com/login");
  });
  ```

- **`page`**: Provides higher-level page actions such as navigation and waiting(Same as PlayWright). Examples:
- Navigate to a URL:
  ```javascript
  await context.page.navigate("https://example.com");
  ```
- Wait for a selector:
  ```javascript
  await context.page.waitForSelector("#loadingSpinner");
  ```
- **`request`**: Use for sending HTTP requests. _(Note: This feature is currently under development.)_

- **`element`**: Use for interacting with elements on the web page. Examples:
- Clicking a button:
  ```javascript
  await element("#submitButton").click();
  ```
- Filling an input:
  ```javascript
  await element("#username").fill("testUser");
  ```
- **`expect`**: Use for assertions in your steps. For example:
  ```javascript
  expect(actualValue).toBe(expectedValue);
  expect(element("Page_Title")).toHaveText(expectedValue);
  ```

## 📋 Simplified Functions

If you don't want to deal with Playwright methods directly, you can simply use the following predefined actions methods by import them:

```javascript
const { mouse, keyboard, frame, elementInteractions, page } = require("artes");
```

- **Mouse Actions:**  
  `mouse.click(element)`

- **Keyboard Actions:**  
  `keyboard.press(key)`

- **Element Interactions:**  
  `elementInteractions.isChecked()`

- **Assertions:**  
  `assert.shouldBeTruthy(element)`

- **Frame Actions:**  
  `frame.first()`

- **API Actions:**  
  `api.post(url, payload, requestDataType)`

---

For a detailed explanation of each function, please refer to the [function definitions](./docs/functionDefinitions.md).

---

### Example of a Custom Step Definition

```javascript
const { Given, When, Then, expect, element, page } = require("artes");

Given("User is on the home page", async () => {
  await page.navigate("https://example.com");
});

When("User clicks the login button", async () => {
  await element("#loginButton").click();
});

Then("User should see the login form", async () => {
  expect(element("#loginForm")).toBeVisible(true);
});
```

## ⚙️ Configuration

You can configure Artes by editing the `artes.config.js` file. Below are the default configuration options with explanations:

| **Option**        | **Default Value**                                                            | **Description**                     |
| ----------------- | ---------------------------------------------------------------------------- | ----------------------------------- |
| `timeout`         | `30`                                                                         | Default timeout in milliseconds.    |
| `paths`           | `[moduleConfig.featuresPath]`                                                | Paths to feature files.             |
| `require`         | `[moduleConfig.stepsPath, "src/stepDefinitions/*.js", "src/hooks/hooks.js"]` | Support code paths (CommonJS).      |
| `pomPath`         | `moduleConfig.pomPath`                                                       | Path to Page Object Models.         |
| `import`          | `[]`                                                                         | Support code paths.                 |
| `format`          | `["rerun:@rerun.txt", "allure-cucumberjs/reporter"]`                         | Formatter names/paths.              |
| `formatOptions`   | `{ "resultsDir": "allure-result" }`                                          | Formatter options.                  |
| `parallel`        | `1`                                                                          | Number of parallel workers.         |
| `dryRun`          | `false`                                                                      | Prepare test run without execution. |
| `failFast`        | `false`                                                                      | Stop on first test failure.         |
| `forceExit`       | `false`                                                                      | Force `process.exit()` after tests. |
| `strict`          | `true`                                                                       | Fail on pending steps.              |
| `backtrace`       | `false`                                                                      | Show full backtrace for errors.     |
| `tags`            | `""`                                                                         | Tag expression to filter scenarios. |
| `name`            | `[]`                                                                         | Run scenarios matching regex.       |
| `order`           | `"defined"`                                                                  | Run order (defined/random).         |
| `language`        | `"en"`                                                                       | Default feature file language.      |
| `loader`          | `[]`                                                                         | Module loader specifications.       |
| `requireModule`   | `[]`                                                                         | Transpilation module names.         |
| `retry`           | `0`                                                                          | Retry attempts for failing tests.   |
| `retryTagFilter`  | `""`                                                                         | Tag expression for retries.         |
| `publish`         | `false`                                                                      | Publish to cucumber.io.             |
| `worldParameters` | `{}`                                                                         | Custom world parameters.            |

### Environment Configuration

| **Option** | **Default Value** | **Description**                                                                                              |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `env`      | `""`              | Environment configuration. Should match the name with the baseURL object, like "dev"                         |
| `baseURL`  | `""`              | Base URL for API requests. Can be object {"dev":"dev-api.com", "pre":"pre-api.com"}, or string "dev-api.com" |

---

### Browser Configuration

| Option        | Default Value                  | Description                                            |
| ------------- | ------------------------------ | ------------------------------------------------------ |
| `browserType` | `"chrome"`                     | Browser type (`"chrome"`, `"firefox"`, or `"webkit"`). |
| `viewport`    | `{ width: 1280, height: 720 }` | Browser viewport size.                                 |
| `headless`    | `true`                         | Run browser in headless mode (`true` or `false`).      |

## 📊 Report Generation

Artes can generate Allure reports. After running tests with the `-r` flag, the reports will be stored in the `report` folder in HTML format. You can view them in your browser after the tests complete.

---

## 👍 Good To Use

If you don't use the -c or --create option that the package offers, save the file below under the `.vscode` folder:

- Those configurations will help autocomplete both predefined and custom step definitions in your features file

**extensions.json**

```json
{
  "recommendations": ["CucumberOpen.cucumber-official"]
}
```

**settings.json**

```json
{
  "cucumber.glue": [
    "tests/steps/*.{ts,js}",
    "node_modules/artes/src/tests/stepDefinitions/*.{ts,js}"
  ],
  "cucumber.features": ["tests/features/*.features"],
  "cucumberautocomplete.syncfeatures": true,
  "cucumberautocomplete.strictGherkinCompletion": true
}
```

---

## 🧑‍💻 Have a Good Testing
