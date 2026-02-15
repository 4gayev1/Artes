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
const { spawnSync } = require("child_process");

const artesConfigPath = path.resolve(process.cwd(), "artes.config.js");

let artesConfig = {};

if (fs.existsSync(artesConfigPath)) {
  artesConfig = require(artesConfigPath);
}

const args = process.argv.slice(2);

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

const env = args[args.indexOf("--env") + 1];
const vars = args[args.indexOf("--saveVar") + 1]
const featureFiles = args[args.indexOf("--features") + 1];
const features = flags.features && featureFiles;
const stepDef = args[args.indexOf("--stepDef") + 1];
const tags = args[args.indexOf("--tags") + 1];
const parallel = args[args.indexOf("--parallel") + 1];
const retry = args[args.indexOf("--retry") + 1];
const rerun = args[args.indexOf("--rerun") + 1];
const percentage = args[args.indexOf("--percentage") + 1];
const browser = args[args.indexOf("--browser") + 1];
const device = args[args.indexOf("--device") + 1];
const baseURL = args[args.indexOf("--baseURL") + 1];
const width = args[args.indexOf("--width") + 1];
const height = args[args.indexOf("--height") + 1];
const timeout = args[args.indexOf("--timeout") + 1];
const slowMo = args[args.indexOf("--slowMo") + 1];

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


function testCoverageCalculation(testStatusDir){
  if(fs.existsSync(testStatusDir)){
    const files = fs.readdirSync(testStatusDir);

    const map = {};
    const retriedTests = [];
    const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  
    files.forEach(file => {
     const match = file.match(uuidRegex);
     if (!match) return;
 
     const id = match[0];
 
     const beforeId = file.substring(0, file.indexOf(id) - 1);
     const afterId = file.substring(file.indexOf(id) + id.length + 1);
 
     const status = beforeId.split('-')[0];
     const scenario = beforeId.substring(status.length + 1);
     const timestamp = afterId;
 
     if (!map[id]) {
       map[id] = {
         count: 1,
         latest: { status, scenario, timestamp }
       };
     } else {
       map[id].count++;
       if (timestamp > map[id].latest.timestamp) {
         map[id].latest = { status, scenario, timestamp };
       }
     }
   });
 
   let total = 0;
   let notPassed = 0;
 
   Object.entries(map).forEach(([id, data]) => {
     total++;
 
     if (data.count > 1) {
       retriedTests.push({
         scenario: data.latest.scenario,
         id,
         count: data.count
       });
     }
 
     if (data.latest.status !== 'PASSED') {
      notPassed++;
     }
   });
 
   if (retriedTests.length > 0) {
     console.warn('\n\x1b[33mRetried test cases:');
     retriedTests.forEach(t => {
       console.warn(`- "${t.scenario}" ran ${t.count} times`);
     });
     console.log("\x1b[0m");
   }
 
   return {
     percentage : (total - notPassed)/total*100,
     totalTests: total,
     notPassed,
     passed: total - notPassed,
     latestStatuses: Object.fromEntries(
       Object.entries(map).map(([id, data]) => [
         id,
         data.latest.status
       ])
     )
   };
  }
}

function main() {
  if (flags.help) return showHelp();
  if (flags.version) return showVersion();
  if (flags.create) return createProject(flags.createYes, flags.noDeps);

  runTests();

  logPomWarnings();

  const testCoverage = testCoverageCalculation(path.join(process.cwd(), "node_modules", "artes" , "testsStatus"))

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

if (fs.existsSync(path.join(process.cwd(), "node_modules", "artes" , "@rerun.txt"))) {
  spawnSync("mv", ["@rerun.txt", process.cwd()], {
    cwd: path.join(process.cwd(), "node_modules", "artes"),
    stdio: "inherit",
    shell: true,
  });
}

  if (
    flags.reportWithTrace ||
    artesConfig.reportWithTrace ||
    flags.report ||
    artesConfig.report
  )
    generateReport();


    if (!( process.env.TRACE === "true"
      ? process.env.TRACE
      : artesConfig.trace || false)) {
      spawnSync(
        "npx",
        [
          "rimraf",
          "--no-glob",
          path.join(process.cwd(), "traces"),
        ],
        {
          cwd: process.cwd(),
          stdio: "inherit",
          shell: false,
        },
      );
    }
    
  cleanUp();
  process.exit(process.env.EXIT_CODE);
}

main();
