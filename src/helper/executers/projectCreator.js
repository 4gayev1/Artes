#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function createProject(createYes) {
  const projectDir = path.join(process.cwd(), "artes");
  const srcDir = path.join(projectDir, "tests");

  [
    projectDir,
    path.join(srcDir, "features"),
    path.join(srcDir, "POMs"),
    path.join(srcDir, "steps"),
    path.join(projectDir, ".vscode"),
  ].forEach((dir) => fs.mkdirSync(dir, { recursive: true }));

  process.chdir(projectDir);

  console.log("🚀 Initializing project...");
  execSync(`npm init ${createYes ? "-y" : ""}`, { stdio: "inherit" });
  execSync("npm i artes", { stdio: "inherit" });

  console.log("📦 Setting up browsers...");
  execSync("npx playwright install", { stdio: "inherit" });

  const packageJsonPath = path.join(projectDir, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  packageJson.scripts = {
    test: "npx artes",
    testWithReport: "npx artes -r",
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  const config = `module.exports = {
    headless: false, // Set to true for headless browser mode

    // Configuration options:
    // paths: [],                    // string[] - Paths to feature files
    // steps: "",                    // string - Step definitions files
    // pomPath: "",                  // string - Path to POM files
    // timeout : 0,                  // number - Test timeout in seconds
    // parallel: 0,                  // number - Number of parallel workers
    // format: [],                   // string[] - Formatter names/paths
    // formatOptions: {},            // object - Formatter options    
    // retry: 0,                     // number - Retry attempts for failing tests
    // tags: "",                     // string - Tag expression to filter scenarios
    // backtrace: false,             // boolean - Show full backtrace for errors
    // dryRun: false,                // boolean - Prepare test run without execution
    // browser: "chrome",            // "chrome", "firefox", "webkit"
    // width: 1280,                  // number - Browser width
    // height: 720,                  // number - Browser height
    // maximizeScreen: true,         // boolean - Open browser in full screen mode
    // forceExit: false,             // boolean - Force process.exit() after tests
    // failFast: false,              // boolean - Stop on first test failure
    // import: [],                   // string[] - Support code paths
    // language: "en",               // string - Default feature file language
    // loader: [],                   // string[] - Module loader specifications
    // name: [],                     // string[] - Run scenarios matching regex
    // order: "defined",             // string - Run order (defined/random)
    // publish: false,               // boolean - Publish to cucumber.io
    // requireModule: [],            // string[] - Transpilation module names
    // retryTagFilter: "",           // string - Tag expression for retries
    // strict: true,                 // boolean - Fail on pending steps
    // worldParameters: {}           // object - World constructor parameters
};
`;

  const featureContent = `Feature: Shopping on SauceDemo 🛒

        Background: Login on SauceDemo
            Given User is on home page of SauceDemo
              And User types "standard_user" in "username_input"
              And User types "secret_sauce" in "password_input"
              And User clicks "#login-button"

        Scenario Outline: Success Shopping
              And User expects the page url should be "https://www.saucedemo.com/inventory.html"
              And User clicks "product_title"
              And User clicks "add_to_cart_button"
              And User clicks "cart_button"
             Then User expects "item_price" should have "$29.99" text

        Scenario Outline: Failed Shopping
              And User expects the page url should be "https://www.saucedemo.com/inventory.html"
              And User clicks "product_title"
              And User clicks "add_to_cart_button"
              And User clicks "cart_button"
             Then User expects "item_price" should not have "$29.99" text

`;

  const pomContent = JSON.stringify(
    {
      username_input: { selector: "#user-name" },
      password_input: "#password",
      login_button: "#login-button",
      product_title:
        "xpath=/html/body/div/div/div/div[2]/div/div/div/div[1]/div[2]/div[1]/a/div",
      add_to_cart_button: "#add-to-cart",
      cart_button: ".shopping_cart_link",
      item_price: ".inventory_item_price",
    },
    null,
    2,
  );

  const stepsContent = `
const {Given,context} = require("artes");

// Example step definition
Given("User is on home page of SauceDemo", async () => {
await context.page.goto("https://www.saucedemo.com/");
});
`;

  const vsCodeExtension = JSON.stringify({
    recommendations: ["CucumberOpen.cucumber-official"],
  });

  const vsCodeSettings = JSON.stringify({
    "cucumber.glue": [
      "tests/steps/*.{ts,js}",
      "node_modules/artes/src/stepDefinitions/*.{ts,js}",
    ],
    "cucumber.features": ["tests/features/*.features"],
    "cucumberautocomplete.syncfeatures": true,
    "cucumberautocomplete.strictGherkinCompletion": true,
  });

  console.log("📂 Creating project files...");

  fs.writeFileSync(path.join(projectDir, "artes.config.js"), config, "utf-8");
  fs.writeFileSync(
    path.join(srcDir, "features", "example.feature"),
    featureContent,
  );
  fs.writeFileSync(path.join(srcDir, "POMs", "example.pom.json"), pomContent);
  fs.writeFileSync(path.join(srcDir, "steps", "common.steps.js"), stepsContent);

  fs.writeFileSync(
    path.join(projectDir, ".vscode", "settings.json"),
    vsCodeSettings,
  );

  fs.writeFileSync(
    path.join(projectDir, ".vscode", "extensions.json"),
    vsCodeExtension,
  );

  console.log(`✨ Project created successfully in ${projectDir}!`);
  console.log("Happy Testing 🎉");
}

module.exports = {
  createProject,
};
