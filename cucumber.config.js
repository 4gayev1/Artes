const fs = require("fs");
const path = require("path");
const { moduleConfig } = require("./src/helper/imports/commons");

let argusConfig = {};

try {
  if (fs.existsSync(moduleConfig.cucumberConfigPath)) {
    const argusConf = require(moduleConfig.cucumberConfigPath);
    argusConfig = argusConf || {};
  }
} catch (error) {
  console.warn("Error reading config file:", error.message);
  console.log("Proceeding with default config.");
}

module.exports = {
  default: {
    // File paths and patterns
    cucumberTimeout: argusConfig.cucumberTimeout || 5000, // Default timeout in milliseconds
    paths: argusConfig.features
      ? path.join(moduleConfig.projectPath, argusConfig.features)
      : [moduleConfig.featuresPath], // Paths to feature files
    require: [
      argusConfig.steps
        ? path.join(moduleConfig.projectPath, argusConfig.steps)
        : moduleConfig.stepsPath,
      "src/tests/stepDefinitions/*.js",
      "src/hooks/hooks.js",
    ], // Support code paths (CommonJS)
    pomPath: argusConfig.pomPath
      ? path.join(moduleConfig.projectPath, argusConfig.pomPath)
      : moduleConfig.pomPath,
    import: argusConfig.import || [], // Support code paths

    // Formatting and output
    format: argusConfig.format || [
      "rerun:@rerun.txt",
      "allure-cucumberjs/reporter",
    ], // Formatter names/paths
    formatOptions: argusConfig.formatOptions || {
      resultsDir: `allure-result`,
    }, // Formatter options

    // Execution options
    parallel: argusConfig.parallel || 1, // Number of parallel workers
    dryRun: argusConfig.dryRun || false, // Prepare test run without execution
    failFast: argusConfig.failFast || false, // Stop on first test failure
    forceExit: argusConfig.forceExit || false, // Force process.exit() after tests
    strict: argusConfig.strict || true, // Fail on pending steps
    backtrace: argusConfig.backtrace || false, // Show full backtrace for errors

    // Filtering and organization
    tags: argusConfig.tags || process.env.npm_config_TAGS || "", // Tag expression to filter scenarios
    name: argusConfig.name || [], // Run scenarios matching regex
    order: argusConfig.order || "defined", // Run order (defined/random)
    language: argusConfig.language || "en", // Default feature file language

    // Module loading
    loader: argusConfig.loader || [], // Module loader specifications
    requireModule: argusConfig.requireModule || [], // Transpilation module names

    // Retry logic
    retry: argusConfig.retry || 0, // Retry attempts for failing tests
    retryTagFilter: argusConfig.retryTagFilter || "", // Tag expression for retries

    // Publishing
    publish: argusConfig.publish || false, // Publish to cucumber.io

    // World parameters
    worldParameters: argusConfig.worldParameters || {}, // Custom world parameters
  },

  browser: {
    browserType: argusConfig.browserType || "chrome",
    viewport: {
      width: argusConfig.viewport?.width || 1280,
      height: argusConfig.viewport?.height || 720,
    },
    headless: argusConfig.headless !== undefined ? argusConfig.headless : true,
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
