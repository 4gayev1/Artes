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

const defaultFormats = ["rerun:@rerun.txt", "progress-bar"];

const userFormatsFromEnv = process.env.REPORT_FORMAT
  ? JSON.parse(process.env.REPORT_FORMAT)
  : [];

const userFormatsFromConfig = artesConfig.format || [];

const finalFormats = [
  ...new Set([
    ...defaultFormats,
    ...userFormatsFromEnv,
    ...userFormatsFromConfig,
  ]),
];

function resolveEnv(artesConfig) {
  if (typeof artesConfig.baseURL === "object" && artesConfig.baseURL !== null) {
    if (
      process.env.ENV &&
      artesConfig.baseURL.hasOwnProperty(process.env.ENV.trim())
    ) {
      return process.env.ENV.trim();
    } else if (
      artesConfig.env &&
      artesConfig.baseURL.hasOwnProperty(artesConfig.env.trim())
    ) {
      return artesConfig.env.trim();
    } else {
      return Object.keys(artesConfig.baseURL)[0];
    }
  }

  return process.env.ENV || artesConfig.env || "";
}
const env = resolveEnv(artesConfig);

module.exports = {
  default: {
    // File paths and patterns
    testPercentage: process.env.PERCENTAGE
      ? Number(process.env.PERCENTAGE)
      : artesConfig.testPercentage || 0, // number - Percentage of tests to run (0-100)
    timeout: process.env.TIMEOUT
      ? Number(process.env.TIMEOUT) * 1000
      : artesConfig.timeout * 1000 || 30 * 1000, // Default timeout in seconds
    paths: process.env.FEATURES
      ? [path.join(moduleConfig.projectPath, process.env.FEATURES)]
      : artesConfig.features
        ? path.join(moduleConfig.projectPath, artesConfig.features)
        : [moduleConfig.featuresPath], // Paths to feature files
    require: [
      process.env.STEP_DEFINITIONS
        ? [path.join(moduleConfig.projectPath, process.env.STEP_DEFINITIONS)]
        : artesConfig.steps
          ? path.join(moduleConfig.projectPath, artesConfig.steps)
          : moduleConfig.stepsPath,
      "src/stepDefinitions/*.js",
      "src/hooks/hooks.js",
    ], // Support code paths (CommonJS)
    pomPath: artesConfig.pomPath
      ? path.join(moduleConfig.projectPath, artesConfig.pomPath)
      : moduleConfig.pomPath,
    import: artesConfig.import || [], // Support code paths

    report:
      process.env.REPORT_WITH_TRACE ??
      artesConfig.reportWithTrace ??
      process.env.REPORT ??
      artesConfig.report ??
      false, // Generate report
    // Formatting and output
    successReport: process.env.REPORT_SUCCESS
      ? true
      : artesConfig.reportSuccess || false, // Include successful tests in report

    trace: process.env.TRACE ? process.env.TRACE : artesConfig.trace || false, // Enable tracing

    reportWithTrace: process.env.REPORT_WITH_TRACE
      ? process.env.REPORT_WITH_TRACE
      : artesConfig.reportWithTrace || false, // Include trace in report

    format: finalFormats, // Formatter names/paths
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
  report: {
    singleFileReport:
      process.env.SINGLE_FILE_REPORT == "true"
        ? true
        : artesConfig.singleFileReport
          ? true
          : false,
    zip: process.env.ZIP == "true" ? true : artesConfig.zip ? true : false,
  },
  env: env,
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
    slowMo: process.env.SLOWMO
      ? Number(process.env.SLOWMO) * 1000
      : artesConfig?.slowMo * 1000 || 0,
  },
};
