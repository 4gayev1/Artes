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


function findDuplicateTestNames() {
  const testStatusFile = path.join(process.cwd(), "node_modules", "artes" , "test-status", 'test-status.txt');
  
  if (!fs.existsSync(testStatusFile)) {
    console.error('test-status.txt not found');
    return;
  }

  const content = fs.readFileSync(testStatusFile, 'utf8');
  const lines = content.split('\n').filter(line => line.trim());

  const testNameToFiles = {};

  lines.forEach(line => {
    const parts = line.split(' | ');
    if (parts.length < 5) return;

    const testName = parts[2].trim();
    const filePath = parts[4].trim();

    if (!testNameToFiles[testName]) {
      testNameToFiles[testName] = new Set();
    }
    
    testNameToFiles[testName].add(filePath);
  });

  const duplicates = {};
  
  Object.entries(testNameToFiles).forEach(([testName, files]) => {
    if (files.size > 1) {
      duplicates[testName] = Array.from(files);
    }
  });

  if (Object.keys(duplicates).length > 0) {
    console.warn('\n\x1b[33m[WARNING] Duplicate scenarios names found: This will effect your reporting');    
    Object.entries(duplicates).forEach(([testName, files]) => {
      console.log(`\x1b[33m"${testName}" exists in:`);
      files.forEach(file => {
        console.log(`  - ${file}`);
      });
      console.log('');
    });
    console.log("\x1b[0m");
  } 

  return duplicates;
}


function testCoverageCalculation() {

  const testStatusFile = path.join(process.cwd(), "node_modules", "artes" , "test-status", 'test-status.txt');
  
  if (!fs.existsSync(testStatusFile)) {
    console.error('test-status.txt not found');
    return null;
  }

  const content = fs.readFileSync(testStatusFile, 'utf8');
  const lines = content.split('\n').filter(line => line.trim());

  const map = {};
  const retriedTests = [];
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

  lines.forEach(line => {
    const parts = line.split(' | ');
    if (parts.length < 5) return;

    const timestamp = parts[0].trim();
    const status = parts[1].trim();
    const scenario = parts[2].trim();
    const id = parts[3].trim();
    const uri = parts[4].trim();

    if (!uuidRegex.test(id)) return;

    if (!map[id]) {
      map[id] = {
        count: 1,
        latest: { status, scenario, timestamp, uri }
      };
    } else {
      map[id].count++;
      if (timestamp > map[id].latest.timestamp) {
        map[id].latest = { status, scenario, timestamp, uri };
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
    percentage: (total - notPassed) / total * 100,
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

function getExecutor() {

  if (process.env.GITHUB_RUN_ID) {
    return {
      name: "GitHub Actions",
      type: "github",
      buildName: `Workflow #${process.env.GITHUB_RUN_NUMBER}`,
      buildOrder: Number(process.env.GITHUB_RUN_NUMBER),
      buildUrl: `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
    };


  } else if (process.env.JENKINS_HOME) {
    return {
      name: "Jenkins",
      type: "jenkins",
      buildName: process.env.JOB_NAME || "Manual Run",
      buildOrder: Number(process.env.BUILD_NUMBER) || 1,
      buildUrl: process.env.BUILD_URL || ""
    };


  } else if (process.env.CI_PIPELINE_ID) {
    return {
      name: "GitLab CI",
      type: "gitlab",
      buildName: `Pipeline #${process.env.CI_PIPELINE_IID}`,
      buildOrder: Number(process.env.CI_PIPELINE_IID) || 1,
      buildUrl: process.env.CI_PIPELINE_URL || ""
    };


  } else if (process.env.BITBUCKET_BUILD_NUMBER) {
    return {
      name: "Bitbucket Pipelines",
      type: "bitbucket",
      buildName: `Build #${process.env.BITBUCKET_BUILD_NUMBER}`,
      buildOrder: Number(process.env.BITBUCKET_BUILD_NUMBER),
      buildUrl: process.env.BITBUCKET_BUILD_URL || ""
    };


  } else if (process.env.CIRCLE_WORKFLOW_ID) {
    return {
      name: "CircleCI",
      type: "circleci",
      buildName: `Workflow #${process.env.CIRCLE_WORKFLOW_ID}`,
      buildOrder: Number(process.env.CIRCLE_BUILD_NUM) || 1,
      buildUrl: process.env.CIRCLE_BUILD_URL || ""
    };


  } else if (process.env.BUILD_BUILDID) {
    return {
      name: "Azure Pipelines",
      type: "azure",
      buildName: `Build #${process.env.BUILD_BUILDID}`,
      buildOrder: Number(process.env.BUILD_BUILDID) || 1,
      buildUrl: process.env.BUILD_BUILDURI || ""
    };


  } else if (process.env.BUILD_NUMBER && process.env.TEAMCITY_VERSION) {
    return {
      name: "TeamCity",
      type: "teamcity",
      buildName: `Build #${process.env.BUILD_NUMBER}`,
      buildOrder: Number(process.env.BUILD_NUMBER) || 1,
      buildUrl: process.env.BUILD_URL || ""
    };


  } else if (process.env.TRAVIS_BUILD_NUMBER) {
    return {
      name: "Travis CI",
      type: "travis",
      buildName: `Build #${process.env.TRAVIS_BUILD_NUMBER}`,
      buildOrder: Number(process.env.TRAVIS_BUILD_NUMBER) || 1,
      buildUrl: process.env.TRAVIS_BUILD_WEB_URL || ""
    };


  } else if (process.env.bamboo_buildNumber) {
    return {
      name: "Bamboo",
      type: "bamboo",
      buildName: `Build #${process.env.bamboo_buildNumber}`,
      buildOrder: Number(process.env.bamboo_buildNumber) || 1,
      buildUrl: process.env.bamboo_resultsUrl || ""
    };


  } else {
    return {
      name: "Local Run",
      type: "local",
      buildName: "Manual Execution",
      buildOrder: 1,
      buildUrl: ""
    };
  }
}


function main() {
  if (flags.help) return showHelp();
  if (flags.version) return showVersion();
  if (flags.create) return createProject(flags.createYes, flags.noDeps);

  runTests();

  logPomWarnings();

  findDuplicateTestNames();

  const testCoverage = testCoverageCalculation()

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

fs.writeFileSync(
  path.join(process.cwd(), "node_modules", "artes",'allure-result',"executor.json"),
  JSON.stringify(executor, null, 2)
);

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
