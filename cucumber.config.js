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
    cucumberTimeout: artesConfig.timeout || 30, // Default timeout in milliseconds
    paths: artesConfig.features
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
    format: artesConfig.format || [
      "rerun:@rerun.txt",
      "allure-cucumberjs/reporter",
    ], // Formatter names/paths
    formatOptions: artesConfig.formatOptions || {
      resultsDir: `allure-result`,
    }, // Formatter options

    // Execution options
    parallel: artesConfig.parallel || 1, // Number of parallel workers
    dryRun: artesConfig.dryRun || false, // Prepare test run without execution
    failFast: artesConfig.failFast || false, // Stop on first test failure
    forceExit: artesConfig.forceExit || false, // Force process.exit() after tests
    strict: artesConfig.strict || true, // Fail on pending steps
    backtrace: artesConfig.backtrace || false, // Show full backtrace for errors

    // Filtering and organization
    tags: artesConfig.tags || process.env.npm_config_TAGS || "", // Tag expression to filter scenarios
    name: artesConfig.name || [], // Run scenarios matching regex
    order: artesConfig.order || "defined", // Run order (defined/random)
    language: artesConfig.language || "en", // Default feature file language

    // Module loading
    loader: artesConfig.loader || [], // Module loader specifications
    requireModule: artesConfig.requireModule || [], // Transpilation module names

    // Retry logic
    retry: artesConfig.retry || 0, // Retry attempts for failing tests
    retryTagFilter: artesConfig.retryTagFilter || "", // Tag expression for retries

    // Publishing
    publish: artesConfig.publish || false, // Publish to cucumber.io

    // World parameters
    worldParameters: artesConfig.worldParameters || {}, // Custom world parameters
  },

  browser: {
    browserType: artesConfig.browserType || "chrome",
    viewport: {
      width: artesConfig?.width || 1280,
      height: artesConfig?.height || 720,
    },
    maximizeScreen: true,
    headless: artesConfig.headless !== undefined ? artesConfig.headless : true,
  },

  ci: {
    ...this.default,
    parallel: 4,
    tags: "@smoke",
    headless: true,
    format: ["json:reports/cucumber-report.json"],
  },

  debug: {
    ...this.default,
    parallel: 1,
    backtrace: true,
    failFast: true,
    format: ["progress-bar"],
  },
};
