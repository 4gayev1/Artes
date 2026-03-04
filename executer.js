#!/usr/bin/env node
const {
  showHelp,
  showVersion,
  createProject,
  runTests,
  generateReport,
  cleanUp,
} = require("./src/helper/executers/exporter");
const { logPomWarnings } = require("./src/helper/controller/pomCollector");
const fs = require("fs");
const path = require("path");
const { testCoverageCalculator } = require("./src/helper/controller/testCoverageCalculator");
const { getExecutor } = require("./src/helper/controller/getExecutor");
const { findDuplicateTestNames } = require("./src/helper/controller/findDuplicateTestNames");


const artesConfigPath = path.resolve(process.cwd(), "artes.config.js");

let artesConfig = {};

if (fs.existsSync(artesConfigPath)) {
  artesConfig = require(artesConfigPath);
}

const args = process.argv.slice(2);

const getArgValue = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
};

const flags = {
  help: args.includes("-h") || args.includes("--help"),
  version: args.includes("-v") || args.includes("--version"),
  create: args.includes("-c") || args.includes("--create"),
  createYes: args.includes("-y") || args.includes("--yes"),
  noDeps: args.includes("--noDeps"),
  report: args.includes("-r") || args.includes("--report"),
  reportSuccess: args.includes("--reportSuccess"),
  trace: args.includes("-t") || args.includes("--trace"),
  reportWithTrace: args.includes("-rwt") || args.includes("--reportWithTrace"),
  singleFileReport: args.includes("--singleFileReport"),
  customLogo: args.includes("--logo"),
  customBrandName:args.includes("--brandName"),
  customReportName:args.includes("--reportName"),
  zip: args.includes("--zip"),
  features: args.includes("--features"),
  stepDef: args.includes("--stepDef"),
  tags: args.includes("--tags"),
  env: args.includes("--env"),
  saveVar: args.includes("--saveVar"),
  headless: args.includes("--headless"),
  parallel: args.includes("--parallel"),
  retry: args.includes("--retry"),
  rerun: args.includes("--rerun"),
  dryRun: args.includes("--dryRun"),
  percentage: args.includes("--percentage"),
  browser: args.includes("--browser"),
  offline: args.includes("--offline"),
  device: args.includes("--device"),
  baseURL: args.includes("--baseURL"),
  maximizeScreen: args.includes("--maxScreen"),
  width: args.includes("--width"),
  height: args.includes("--height"),
  timeout: args.includes("--timeout"),
  slowMo: args.includes("--slowMo"),
};


const env = getArgValue("--env");
const vars = getArgValue("--saveVar");
const logo = getArgValue("--logo");
const brandName = getArgValue("--brandName");
const reportName = getArgValue("--reportName");
const featureFiles = getArgValue("--features");
const features = flags.features && featureFiles;
const stepDef = getArgValue("--stepDef");
const tags = getArgValue("--tags");
const parallel = getArgValue("--parallel");
const retry = getArgValue("--retry");
const rerun = getArgValue("--rerun");
const percentage = getArgValue("--percentage");
const browser = getArgValue("--browser");
const device = getArgValue("--device");
const baseURL = getArgValue("--baseURL");
const width = getArgValue("--width");
const height = getArgValue("--height");
const timeout = getArgValue("--timeout");
const slowMo = getArgValue("--slowMo");


flags.env ? (process.env.ENV = env) : "";

vars ? (process.env.VARS = vars) : "";

flags.reportWithTrace ||
artesConfig.reportWithTrace ||
flags.report ||
artesConfig.report
  ? (process.env.REPORT_FORMAT = JSON.stringify([
      "allure-cucumberjs/reporter:./allure-results",
    ]))
  : "";

flags.customLogo ? (process.env.LOGO = logo) : "";
flags.customBrandName ? (process.env.BRAND_NAME = brandName) : "";
flags.customReportName ? (process.env.REPORT_NAME = reportName) : "";

flags.reportSuccess ? (process.env.REPORT_SUCCESS = true) : "";

flags.tags && console.log("Running tags:", tags);
flags.tags ? (process.env.RUN_TAGS = JSON.stringify(tags)) : "";

flags.features && console.log("Running features:", features);
flags.features ? (process.env.FEATURES = features) : "";

flags.stepDef && console.log("Running step definitions:", flags.stepDef);
flags.stepDef ? (process.env.STEP_DEFINITIONS = stepDef) : "";

flags.report ? (process.env.REPORT = true) : "";

flags.trace ? (process.env.TRACE = true) : "";

flags.reportWithTrace
  ? (process.env.REPORT_WITH_TRACE = true)
  : (process.env.REPORT_WITH_TRACE = false);

flags.singleFileReport
  ? (process.env.SINGLE_FILE_REPORT = true)
  : (process.env.SINGLE_FILE_REPORT = false);

flags.zip ? (process.env.ZIP = true) : (process.env.ZIP = false);

flags.headless &&
  console.log("Running mode:", flags.headless ? "headless" : "headed");
flags.headless ? (process.env.MODE = JSON.stringify(true)) : false;

flags.parallel ? (process.env.PARALLEL = parallel) : "";

flags.retry ? (process.env.RETRY = retry) : "";

flags.rerun ? (process.env.RERUN = rerun) : "";

flags.dryRun ? (process.env.DRYRUN = flags.dryRun) : "";

flags.percentage ? (process.env.PERCENTAGE = percentage) : "";

flags.browser && console.log("Running browser:", browser);
flags.browser ? (process.env.BROWSER = JSON.stringify(browser)) : "";

flags.browser && console.log("Running mode:", flags.offline && "Offline");
flags.offline ? (process.env.OFFLINE = true) : "";

flags.device && console.log("Running device:", device);
flags.device ? (process.env.DEVICE = JSON.stringify(device)) : "";

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
  if (flags.create) return createProject(flags.createYes, flags.noDeps);

  runTests();

  logPomWarnings();

  findDuplicateTestNames();

  const testCoverage = testCoverageCalculator()

  const testPercentage = (process.env.PERCENTAGE  ? Number(process.env.PERCENTAGE)  : artesConfig.testPercentage || 0)

  if (testPercentage > 0) {

    const meetsThreshold = testCoverage.percentage >= testPercentage

    if (meetsThreshold) {
      console.log(
        `✅ Tests passed required ${testPercentage}% success rate with ${testCoverage.percentage.toFixed(2)}%!`,
      );
      process.env.EXIT_CODE = parseInt(0, 10);
    } else {
      console.log(
        `❌ Tests failed required ${testPercentage}% success rate with ${testCoverage.percentage.toFixed(2)}%!`,
      );
      process.env.EXIT_CODE = parseInt(1, 10);
    }
  }


const source = path.join(process.cwd(), "node_modules", "artes", "@rerun.txt");
const destination = path.join(process.cwd(), "@rerun.txt");

if (fs.existsSync(source)) {
  fs.renameSync(source, destination);
}

  if (
    flags.reportWithTrace ||
    artesConfig.reportWithTrace ||
    flags.report ||
    artesConfig.report
  ){
    const executor = getExecutor();

if(fs.existsSync(path.join(process.cwd(), "node_modules", "artes",'allure-result'))){
  fs.writeFileSync(
    path.join(process.cwd(), "node_modules", "artes",'allure-result',"executor.json"),
    JSON.stringify(executor, null, 2)
  );
}

generateReport();

  }

    if (!( process.env.TRACE === "true"
      ? process.env.TRACE
      : artesConfig.trace || false)) {
          fs.rmSync(path.join(process.cwd(), "traces"), {
            recursive: true,
            force: true,
          });
    }
    
  cleanUp();
  process.exit(process.env.EXIT_CODE);
}

main();
