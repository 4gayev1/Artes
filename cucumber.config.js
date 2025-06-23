const fs = require("fs");
const path = require("path");
const { moduleConfig } = require("./src/helper/imports/commons");

let artesConfig = {};

try {
  if (fs.existsSync(moduleConfig.cucumberConfigPath)) {
    const artesConf = require(moduleConfig.cucumberConfigPath);
    artesConfig = artesConf || {};
  }
} catch (error) {
  console.warn("Error reading config file:", error.message);
  console.log("Proceeding with default config.");
}

module.exports = {
  default: {
    // File paths and patterns
    testPercentage: process.env.PERCENTAGE
      ? Number(process.env.PERCENTAGE)
      : artesConfig.testPercentage || 0, // number - Percentage of tests to run (0-100)
    timeout: process.env.TIMEOUT
      ? Number(process.env.TIMEOUT)
      : artesConfig.timeout || 30, // Default timeout in milliseconds
    paths: process.env.FEATURES
      ? [path.join(moduleConfig.projectPath, process.env.FEATURES)]
      : artesConfig.features
        ? path.join(moduleConfig.projectPath, artesConfig.features)
        : [moduleConfig.featuresPath], // Paths to feature files
    require: [
      artesConfig.steps
        ? path.join(moduleConfig.projectPath, artesConfig.steps)
        : moduleConfig.stepsPath,
      "src/stepDefinitions/*.js",
      "src/hooks/hooks.js",
    ], // Support code paths (CommonJS)
    pomPath: artesConfig.pomPath
      ? path.join(moduleConfig.projectPath, artesConfig.pomPath)
      : moduleConfig.pomPath,
    import: artesConfig.import || [], // Support code paths

    // Formatting and output
    format: process.env.REPORT_FORMAT
      ? JSON.parse(process.env.REPORT_FORMAT)
      : artesConfig.format || [
          "rerun:@rerun.txt",
          "allure-cucumberjs/reporter",
        ], // Formatter names/paths
    formatOptions: artesConfig.formatOptions || {
      resultsDir: `allure-result`,
    }, // Formatter options

    // Execution options
    parallel: process.env.PARALLEL
      ? Number(process.env.PARALLEL)
      : artesConfig.parallel || 1, // Number of parallel workers
    dryRun: process.env.DRYRUN
      ? process.env.DRYRUN
      : artesConfig.dryRun || false, // Prepare test run without execution
    failFast: artesConfig.failFast || false, // Stop on first test failure
    forceExit: artesConfig.forceExit || false, // Force process.exit() after tests
    strict: artesConfig.strict || true, // Fail on pending steps
    backtrace: artesConfig.backtrace || false, // Show full backtrace for errors

    // Filtering and organization
    tags: process.env.RUN_TAGS
      ? JSON.parse(process.env.RUN_TAGS)
      : artesConfig.tags || artesConfig.tags || "", // Tag expression to filter scenarios
    name: artesConfig.name || [], // Run scenarios matching regex
    order: artesConfig.order || "defined", // Run order (defined/random)
    language: artesConfig.language || "en", // Default feature file language

    // Module loading
    loader: artesConfig.loader || [], // Module loader specifications
    requireModule: artesConfig.requireModule || [], // Transpilation module names

    // Retry logic
    retry: process.env.RETRY
      ? Number(process.env.RETRY)
      : artesConfig.retry || 0, // Retry attempts for failing tests
    retryTagFilter: artesConfig.retryTagFilter || "", // Tag expression for retries

    // Publishing
    publish: artesConfig.publish || false, // Publish to cucumber.io

    // World parameters
    worldParameters: artesConfig.worldParameters || {}, // Custom world parameters
  },
  env: process.env.ENV ? JSON.parse(process.env.ENV) : artesConfig.env || "",
  baseURL: process.env.BASE_URL
    ? JSON.parse(process.env.BASE_URL)
    : artesConfig?.baseURL
      ? artesConfig?.baseURL
      : "",

  browser: {
    browserType: process.env.BROWSER
      ? JSON.parse(process.env.BROWSER)
      : artesConfig?.browser || "chrome",
    viewport: {
      width: process.env.WIDTH
        ? Number(process.env.WIDTH)
        : artesConfig?.width || 1280,
      height: process.env.HEIGHT
        ? Number(process.env.HEIGHT)
        : artesConfig?.height || 720,
    },
    maximizeScreen: process.env.MAXIMIZE_SCREEN
      ? JSON.parse(process.env.MAXIMIZE_SCREEN)
      : artesConfig?.maximizeScreen !== undefined
        ? artesConfig.maximizeScreen
        : true,
    headless: process.env.MODE
      ? JSON.parse(process.env.MODE)
      : artesConfig?.headless !== undefined
        ? artesConfig.headless
        : true,
  },
};
