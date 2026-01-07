<p align="center">
  <img alt="artesLogo" src="https://github.com/user-attachments/assets/e0641011-0e96-4330-8ad5-935b395b0838" width="280">
</p>

<h1 align="center">Artes</h1>

## 🚀 Summary

Artes is a test runner for Playwright that executes [predefined Cucumber tests](./docs/stepDefinitions.md) and can generate Allure reports for test results. It simplifies setting up Playwright with Cucumber in your automation workflow. With Artes, you can easily run tests without writing step definitions, generate reports, and customize your testing environment.

![artes demonstration](https://github.com/user-attachments/assets/c46172f7-103d-45d1-a37d-8d4267df0967)

---

## 🌟 Artes Benefits

### 🚀 Fast Setup & Smooth Onboarding
- Install in minutes and create a test project effortlessly
- Well-structured, easy-to-follow documentation for a smooth learning curve
- Designed for long-term maintainability and scalability

### 🧩 Powerful & Developer-Friendly Architecture
- Intuitive API for writing custom step definitions
- Rich set of ready-to-use step definitions to speed up test creation
- Fully extensible — add your own step definitions anytime

### 🌐 Advanced API Testing
- Schema validation to ensure API response correctness
- Rich assertion library for precise validations
- Support for all HTTP methods
- Environment-based API configuration for flexible testing

### 🔁 Smart Variable & Data Handling
- Page Object Model (POM) support for structured data management
- Save, reuse, and share variables across steps
- Built-in data randomization for dynamic and realistic test data
- Environment-specific variables for clean environment separation

### 🖥️ Modern UI Automation
- Wide locator strategy support (CSS, XPath, text-based, and more)
- Built-in browser actions
- Cookie management
- Local & session storage handling

### ⚙️ Flexible Configuration & Hooks
- Environment-based configuration system
- Powerful and customizable configuration files
- Full hook support:
  - Before / After
  - Step-level and scenario-level hooks

### 🧪 CLI, CI/CD & Containerization
- Powerful CLI for full control from the command line
- Official [Artes Docker image](https://hub.docker.com/r/vahidaghayev/artes) for seamless containerized execution
- CI/CD-ready — integrate easily with any pipeline

### 📊 Artes Reporting System
- Easy installation with docker compose (For detailed info: [Artes Reporting System](https://github.com/4gayev1/artes-reporting-system))
- Multiple reporting formats supported
- Native Allure reporting integration
- Customizable Artes Reporting System

---

## 🧑‍💻 Installation

You can install **Artes** via npm. To install it globally **(RECOMMENDED)**, run the following command:

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

| Option                    | Description                                                                        | Usage Example                                                         |
| ------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 🆘 `-h, --help`           | Show the usage options                                                             | `artes -h` or `artes --help`                                          |
| 🏷️ `-v, --version`        | Show the current version of Artes                                                  | `artes -v` or `artes --version`                                       |
| 🏗️ `-c, --create`         | Create an example project with Artes                                               | `artes -c` or `artes --create`                                        |
| ✅ `-y, --yes`            | Skip the confirmation prompt when creating an example project                      | `artes -c -y` or `artes --create --yes`                               |
| 📊 `-r, --report`         | Run tests and generate Allure report                                               | `artes -r` or `artes --report`                                        |
| `--reportSuccess`         | Add screenshots and video records for also Success test cases                      | `artes --reportSuccess`                                               |
| `--trace`                 | Enable tracing                                                                     | `artes --trace`                                                       |
| `-rwt, --reportWithTrace` | Add trace to the report                                                            | `artes -rwt` or `artes --reportWithTrace`                             |
| `--singleFileReport`      | Generate single file allure report                                                 | `artes -r --singleFileReport`                                         |
| `--zip`                   | Zip the report folder after generation                                             | `artes -r --zip`                                                      |
| 📁 `--features`           | Specify one or more feature files' relative paths to run (comma-separated)         | `artes --features "tests/features/Alma,tests/features/Banan.feature"` |
| 📜 `--stepDef`            | Specify one or more step definition files' relative paths to use (comma-separated) | `artes --stepDef "tests/steps/login.js,tests/steps/home.js"`          |
| 🔖 `--tags`               | Run tests with specified Cucumber tags                                             | `artes --tags "@smoke or @wip"`                                       |
| 🌐 `--env`                | Set the environment for the test run                                               | `artes --env "dev"`                                                   |
| 🕶️ `--headless`           | Run browser in headless mode                                                       | `artes --headless`                                                    |
| ⚡ `--parallel`           | Run tests in parallel mode                                                         | `artes --parallel 2`                                                  |
| 🔁 `--retry`              | Retry failed tests                                                                 | `artes --retry 3`                                                     |
| 🎭 `--dryRun`             | Perform a dry run without executing tests                                          | `artes --dryRun`                                                      |
| 📈 `--percentage`         | Set minimum success percentage to pass test run (default is 0)                     | `artes --percentage 85`                                               |
| 🌍 `--browser`            | Specify browser to use (`chromium`, `firefox`, or `webkit`)                        | `artes --browser chromium`                                            |
| 🔗 `--baseURL`            | Set base URL for the tests                                                         | `artes --baseURL "https://example.com"`                               |
| 🖥️ `--maxScreen`          | Maximize browser window on launch                                                  | `artes --maxScreen`                                                   |
| 📏 `--width`              | Set browser width (default is 1280)                                                | `artes --width 1920`                                                  |
| 📐 `--height`             | Set browser height (default is 720)                                                | `artes --height 1080`                                                 |
| ⏱️ `--timeout`            | Set timeout for each test step in seconds (default is 30 seconds)                  | `artes --timeout 10`                                                  |
| 🐢 `--slowMo`             | Slow down text execution for clear view (default: 0 seconds)                       | `artes --slowMo 1`                                                    |

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
- ⏳ "waitTime" is to define custom wait for elements, but the feature currently under development.
  "selector" must be used if "waitTime" is used, but when using only selector is not needed mention in "selector"

---

## 🔄 Variable Management

Artes provides powerful variable management capabilities that allow you to save, reuse, and share variables across test steps.

### Saving Variables from API Responses

You can save variables directly from API responses, even using dot notation to extract nested values:

```gherkin
When User sends GET request to "https://www.test.com" and saves "id" variables
 And User sends GET request to "https://www.test.com/items/{{id}}"
Then User expects that response should have 200 status code
```

### Manual Variable Assignment

Save variables manually using the dedicated step:

```gherkin
And User saves "15" variable as "id"
```

### Variable Randomization

Artes includes built-in randomization for generating dynamic test data:

```gherkin
And User sets random email as "email"
And User sets random 5 words as "description"
And User sets random fullname as "fullName"
```

### Using Variables in Tests

Reference saved variables anywhere in your tests using double curly braces:

```gherkin
When User types "{{email}}" in "email_input"
```

📚 **For detailed information and complete step definitions**, visit the [Variable Management Documentation](https://github.com/4gayev1/Artes/blob/main/docs/stepDefinitions.md#variable-management).

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

### Example of Custom Step Definition

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

## 🪝 Hooks (Lifecycle Hooks)

Artes supports **hooks** that allow you to execute custom logic **before and after tests, scenarios, and steps**.

Hooks are **user-defined**.

---

### 📁 Hooks File Location

Create the following file **inside your project** (optional):
```
tests/steps/hooks.js
```

---

### ✍️ Writing Hooks

You can define **only the hooks you need** in hooks.js under the steps folder.  
Undefined hooks are automatically skipped.

```js
// tests/steps/hooks.js

export function BeforeStep() {
    // hook for before each step
}

export function Before() {
    // hook for before each test
}

export function BeforeAll() {
    // hook for before all tests
}

export function AfterStep() {
    // hook for after each step
}

export function After() {
    // hook for after each test
}

export function AfterAll() {
    // hook for after all tests
}
```

---

### 🔁 Supported Hook Types

| Hook Name    | Execution Time                |
| ------------ | ----------------------------- |
| `BeforeAll`  | Once before **all scenarios** |
| `Before`     | Before **each scenario**      |
| `BeforeStep` | Before **each step**          |
| `AfterStep`  | After **each step**           |
| `After`      | After **each scenario**       |
| `AfterAll`   | Once after **all scenarios**  |

---

### ▶️ Execution Order Example

For a scenario with steps:
```
BeforeAll
Before
BeforeStep
(step executes)
AfterStep
After
AfterAll
```

---

## ⚙️ Configuration

You can configure Artes by editing the `artes.config.js` file. Below are the default configuration options with explanations:

| **Option**        | **Default Value**                                                            | **Description**                                               |
| ----------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `timeout`         | `30`                                                                         | Default timeout in seconds.                                   |
| `slowMo`          | `0`                                                                          | Default slow motion in seconds                                |
| `paths`           | `[moduleConfig.featuresPath]`                                                | Paths to feature files.                                       |
| `require`         | `[moduleConfig.stepsPath, "src/stepDefinitions/*.js", "src/hooks/hooks.js"]` | Support code paths (CommonJS).                                |
| `pomPath`         | `moduleConfig.pomPath`                                                       | Path to Page Object Models.                                   |
| `import`          | `[]`                                                                         | Support code paths.                                           |
| `testPercentage`  | `0`                                                                          | Define test coverage percentage                               |
| `report`          | `false`                                                                      | Generate report                                               |
| `reportSuccess`   | `false`                                                                      | Add screenshots and video records for also success test cases |
| `trace`           | `false`                                                                      | Enable trace                                                  |
| `reportWithTrace` | `false`                                                                      | Add trace to the report                                       |
| `format`          | `["rerun:@rerun.txt", "allure-cucumberjs/reporter"]`                         | Formatter names/paths.                                        |
| `formatOptions`   | `{ "resultsDir": "allure-result" }`                                          | Formatter options.                                            |
| `parallel`        | `1`                                                                          | Number of parallel workers.                                   |
| `dryRun`          | `false`                                                                      | Prepare test run without execution.                           |
| `failFast`        | `false`                                                                      | Stop on first test failure.                                   |
| `forceExit`       | `false`                                                                      | Force `process.exit()` after tests.                           |
| `strict`          | `true`                                                                       | Fail on pending steps.                                        |
| `backtrace`       | `false`                                                                      | Show full backtrace for errors.                               |
| `tags`            | `""`                                                                         | Tag expression to filter scenarios.                           |
| `name`            | `[]`                                                                         | Run scenarios matching regex.                                 |
| `order`           | `"defined"`                                                                  | Run order (defined/random).                                   |
| `language`        | `"en"`                                                                       | Default feature file language.                                |
| `loader`          | `[]`                                                                         | Module loader specifications.                                 |
| `requireModule`   | `[]`                                                                         | Transpilation module names.                                   |
| `retry`           | `0`                                                                          | Retry attempts for failing tests.                             |
| `retryTagFilter`  | `""`                                                                         | Tag expression for retries.                                   |
| `publish`         | `false`                                                                      | Publish to cucumber.io.                                       |
| `worldParameters` | `{}`                                                                         | Custom world parameters.                                      |

---

## 🌍 Environment Configuration

| **Option** | **Default Value** | **Description**                                                                                              |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `env`      | `""`              | Environment configuration. Should match the name with the baseURL object, like "dev"                         |
| `baseURL`  | `""`              | Base URL for API requests. Can be object {"dev":"dev-api.com", "pre":"pre-api.com"}, or string "dev-api.com" |

### Environment Variables Configuration

Artes supports environment-specific configurations through environment variables. This feature allows to manage different settings for environments.

### Setting Up Environment Variables

1. **Configure Environment in artes.config.js:**
   ```javascript
   module.exports = {
     baseURL: {
       dev: "https://dev.alma.az",
       pre: "https://pre.alma.az", 
       prod: "https://api.alma.az"
     },
     env: "dev", // Specify which environment to use
   };
   ```

   **Alternative single URL configuration:**
   ```javascript
   module.exports = {
     baseURL: "https://api.alma.az", // Direct string URL
   };
   ```

2. **Create Environment Variable Files:**
   Create JSON files under `src/tests/environment_variables/` folder with names matching your environment:

   **dev.env.json:**
   ```json
   {
     "api_key": "dev-api-key-12345",
     "auth_token": "dev-auth-token",
     "database_url": "dev-db.example.com",
     "timeout": 5000,
     "headers": {
       "Authorization": "Bearer dev-token",
       "Content-Type": "application/json"
     }
   }
   ```

### How It Works

1. **Environment Detection:** When Artes runs, it reads the `env` value from `artes.config.js`
2. **Base URL Resolution:** If `baseURL` is an object, it uses the environment key to find the corresponding URL. If `baseURL` is a string, it uses it directly
3. **Variable Loading:** Artes looks for a JSON file matching the environment name in `src/tests/environment_variables/`
4. **Runtime Access:** All variables from the environment file become available during test execution

### Important Notes

- ⚠️ **Base URLs must be defined in `artes.config.js`** - they cannot be set in the environment variable JSON files
- 📁 Environment variable files should be placed in `src/tests/environment_variables/` 
- 🏷️ File names must follow the format `{env}.env.json` (e.g., `dev.env.json` for `env: "dev"`)
- 🔄 Variables are loaded into variable storage and can be accessed during test runs
- 🌐 Use environment variables for headers, API keys, timeouts, and other environment-specific configurations

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

## 🐳 Docker Image for CI/CD

A Docker image `vahidaghayev/artes` is available for running Artes in CI/CD pipelines. This image includes:

- **Playwright Browsers**: Pre-installed to support UI testing.
- **Xvfb**: Enables running UI tests with video recording in a virtual display.

### Recommended Settings for Best Quality

To achieve the best video recording quality, use the following command:

```bash
xvfb-run -a --server-args="-screen 0 3840x1180x24" --auto-servernum npx artes --width 1600 --height 900
```

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