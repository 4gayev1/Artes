#!/usr/bin/env node
const {
  showHelp,
  showVersion,
  createProject,
  runTests,
  generateReport,
  cleanUp,
} = require("./src/helper/executers/exporter");

const args = process.argv.slice(2);

const flags = {
  help: args.includes("-h") || args.includes("--help"),
  version: args.includes("-v") || args.includes("--version"),
  create: args.includes("-c") || args.includes("--create"),
  createYes: args.includes("-y") || args.includes("--yes"),
  report: args.includes("-r") || args.includes("--report"),
  reportSuccess: args.includes("--reportSuccess"),
  trace: args.includes("-t") || args.includes("--trace"),
  features: args.includes("--features"),
  stepDef: args.includes("--stepDef"),
  tags: args.includes("--tags"),
  env: args.includes("--env"),
  headless: args.includes("--headless"),
  parallel: args.includes("--parallel"),
  retry: args.includes("--retry"),
  dryRun: args.includes("--dryRun"),
  percentage: args.includes("--percentage"),
  browser: args.includes("--browser"),
  baseURL: args.includes("--baseURL"),
  maximizeScreen: args.includes("--maxScreen"),
  width: args.includes("--width"),
  height: args.includes("--height"),
  timeout: args.includes("--timeout"),
  slowMo: args.includes("--slowMo"),
};

const env = args[args.indexOf("--env") + 1];
const featureFiles = args[args.indexOf("--features") + 1];
const features = flags.features && featureFiles;
const stepDef = args[args.indexOf("--stepDef") + 1];
const tags = args[args.indexOf("--tags") + 1];
const parallel = args[args.indexOf("--parallel") + 1];
const retry = args[args.indexOf("--retry") + 1];
const percentage = args[args.indexOf("--percentage") + 1];
const browser = args[args.indexOf("--browser") + 1];
const baseURL = args[args.indexOf("--baseURL") + 1];
const width = args[args.indexOf("--width") + 1];
const height = args[args.indexOf("--height") + 1];
const timeout = args[args.indexOf("--timeout") + 1];
const slowMo = args[args.indexOf("--slowMo") + 1];

flags.env && console.log("Running env:", env);
flags.env ? (process.env.ENV = JSON.stringify(env)) : "";

flags.report
  ? (process.env.REPORT_FORMAT = JSON.stringify([
      "allure-cucumberjs/reporter:./allure-results",
    ]))
  : "";

flags.reportSuccess ? (process.env.REPORT_SUCCESS = true) : "";

flags.tags && console.log("Running tags:", tags);
flags.tags ? (process.env.RUN_TAGS = JSON.stringify(tags)) : "";

flags.features && console.log("Running features:", features);
flags.features ? (process.env.FEATURES = features) : "";

flags.stepDef && console.log("Running step definitions:", flags.stepDef);
flags.stepDef ? (process.env.STEP_DEFINITIONS = stepDef) : "";

flags.headless &&
  console.log("Running mode:", flags.headless ? "headless" : "headed");
flags.headless ? (process.env.MODE = JSON.stringify(true)) : false;

flags.parallel ? (process.env.PARALLEL = parallel) : "";

flags.retry ? (process.env.RETRY = retry) : "";

flags.dryRun ? (process.env.DRYRUN = flags.dryRun) : "";

flags.percentage ? (process.env.PERCENTAGE = percentage) : "";

flags.browser && console.log("Running browser:", browser);
flags.browser ? (process.env.BROWSER = JSON.stringify(browser)) : "";

flags.baseURL ? (process.env.BASE_URL = JSON.stringify(baseURL)) : "";

flags.maximizeScreen
  ? (process.env.MAXIMIZE_SCREEN = flags.maximizeScreen)
  : "";

flags.width && console.log("Running width:", width);
flags.width ? (process.env.WIDTH = width) : "";

flags.height && console.log("Running height:", height);
flags.height ? (process.env.HEIGHT = height) : "";

flags.timeout ? (process.env.TIMEOUT = timeout) : "";

flags.slowMo ? (process.env.SLOWMO = slowMo) : "";

function main() {
  if (flags.help) return showHelp();
  if (flags.version) return showVersion();
  if (flags.create) return createProject(flags.createYes);

  runTests();
  if (flags.report) generateReport();
  cleanUp();
  process.exit(process.env.EXIT_CODE);
}

main();
