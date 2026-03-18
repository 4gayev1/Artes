#!/usr/bin/env node
const {
  showHelp,
  showAIHelp,
  showVersion,
  showBrowserHelp,
  showExecutionHelp,
  showReportingHelp,
  createProject,
  runTests,
  generateReport,
  cleanUp,
} = require("./src/helper/executers/exporter");

const { logPomWarnings } = require("./src/helper/controller/pomCollector");
const { testCoverageCalculator } = require("./src/helper/controller/testCoverageCalculator");
const { getExecutor } = require("./src/helper/controller/getExecutor");
const { findDuplicateTestNames } = require("./src/helper/controller/findDuplicateTestNames");
const { getEnvInfo } = require("artes/src/helper/controller/getEnvInfo");
const { uploadReport } = require("./src/helper/controller/reportUploader");

const fs = require("fs");
const path = require("path");

const artesConfigPath = path.resolve(process.cwd(), "artes.config.js");

let artesConfig = {};

if (fs.existsSync(artesConfigPath)) {
  artesConfig = require(artesConfigPath);
}

const args = process.argv.slice(2);

const set = (key, value) => { if (value) process.env[key] = value; };

const getArgValue = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
};


const flags = {
  // Main
  help:    args.includes("-h") || args.includes("--help"),
  version: args.includes("-v") || args.includes("--version"),
  create:  args.includes("-c") || args.includes("--create"),
  createYes: args.includes("-y") || args.includes("--yes"),
  noDeps: args.includes("--noDeps"),

  // Sub-command help pages
  reportHelp:    (args[0] === "report"    && args.includes("--help")),
  browserHelp:   (args[0] === "browser"   && args.includes("--help")),
  executionHelp: (args[0] === "execution" && args.includes("--help")),
  aiHelp:        (args[0] === "ai"        && args.includes("--help")),

  // Reporting
  report:           args.includes("-r")              || args.includes("--report"),
  reportSuccess:    args.includes("--reportSuccess"),
  reportWithTrace:  args.includes("-rwt")            || args.includes("--reportWithTrace"),
  trace:            args.includes("--trace"),
  singleFileReport: args.includes("--singleFileReport"),
  zip:              args.includes("--zip"),
  logo:             args.includes("--logo"),
  brandName:        args.includes("--brandName"),
  reportName:       args.includes("--reportName"),
  uploadReport:     args.includes("--uploadReport"),
  reporterURL:      args.includes("--reporterURL"),
  projectName:      args.includes("--projectName"),
  projectType:      args.includes("--projectType"),
  reportPath:       args.includes("--reportPath"),

  // Browser & Environment
  browser:    args.includes("--browser"),
  device:     args.includes("--device"),
  maxScreen:  args.includes("--maxScreen"),
  width:      args.includes("--width"),
  height:     args.includes("--height"),

  // Execution
  baseURL:    args.includes("--baseURL"),
  env:        args.includes("--env"),
  headless:   args.includes("--headless"),
  offline:    args.includes("--offline"),
  features:   args.includes("--features"),
  stepDef:    args.includes("--stepDef"),
  tags:       args.includes("--tags"),
  parallel:   args.includes("--parallel"),
  retry:      args.includes("--retry"),
  rerun:      args.includes("--rerun"),
  dryRun:     args.includes("--dryRun"),
  percentage: args.includes("--percentage"),
  timeout:    args.includes("--timeout"),
  slowMo:     args.includes("--slowMo"),
  saveVar:    args.includes("--saveVar"),

  // AI
  ai:          args.includes("--ai"),
  aiModel:     args.includes("--aiModel"),
  aiKey:       args.includes("--aiKey"),
  aiURL:       args.includes("--aiURL"),
  aiLanguage:  args.includes("--aiLanguage"),
  maxTokens:   args.includes("--maxTokens"),
  maxReports:  args.includes("--maxReports"),
};

const shouldReport = flags.reportWithTrace || artesConfig.reportWithTrace || flags.report || artesConfig.report;

// Reporting & Branding
const logo             = getArgValue("--logo");
const brandName        = getArgValue("--brandName");
const reportName       = getArgValue("--reportName");
const reporterURL      = getArgValue("--reporterURL");
const projectName      = getArgValue("--projectName");
const projectType      = getArgValue("--projectType");
const reportPath       = getArgValue("--reportPath");

// Browser & Environment
const browser   = getArgValue("--browser");
const baseURL   = getArgValue("--baseURL");
const device    = getArgValue("--device");
const width     = getArgValue("--width");
const height    = getArgValue("--height");

// Execution
const env          = getArgValue("--env");
const featureFiles = getArgValue("--features");
const features = flags.features && featureFiles;
const stepDef      = getArgValue("--stepDef");
const tags         = getArgValue("--tags");
const parallel     = getArgValue("--parallel");
const retry        = getArgValue("--retry");
const rerun        = getArgValue("--rerun");
const percentage   = getArgValue("--percentage");
const timeout      = getArgValue("--timeout");
const slowMo       = getArgValue("--slowMo");
const vars         = getArgValue("--saveVar");

// AI
const aiModel    = getArgValue("--aiModel");
const aiKey      = getArgValue("--aiKey");
const aiURL      = getArgValue("--aiURL");
const aiLanguage = getArgValue("--aiLanguage");
const maxTokens  = getArgValue("--maxTokens");
const maxReports = getArgValue("--maxReports");



// Reporting & Branding
set("REPORT",              flags.report);
set("REPORT_SUCCESS",      flags.reportSuccess);
set("SINGLE_FILE_REPORT",  flags.singleFileReport);
set("REPORT_WITH_TRACE",   flags.reportWithTrace);
set("TRACE",               flags.trace);
set("ZIP",                 flags.zip);
set("LOGO",                logo);
set("BRAND_NAME",          brandName);
set("REPORT_NAME",         reportName);

if (shouldReport) { process.env.REPORT_FORMAT = JSON.stringify(["allure-cucumberjs/reporter:./allure-results"]) }

set("REPORTER_URL",  reporterURL);
set("PROJECT_NAME",  projectName);
set("PROJECT_TYPE",  projectType);
set("REPORT_PATH",   reportPath);

// Browser & Environment
set("BROWSER",          browser);
set("BASE_URL",         baseURL ? JSON.stringify(baseURL) : null);
set("DEVICE",           device  ? JSON.stringify(device)  : null);
set("MODE",             flags.headless ? JSON.stringify(true)   : null);
set("OFFLINE",          flags.offline);
set("MAXIMIZE_SCREEN",  flags.maxScreen);
set("WIDTH",            width);
set("HEIGHT",           height);

// Execution
set("ENV",  env);
set("VARS", vars);
set("FEATURES",         features);
set("STEP_DEFINITIONS", stepDef);
set("RUN_TAGS",         tags ? JSON.stringify(tags) : null);
set("PARALLEL",         parallel);
set("RETRY",            retry);
set("RERUN",            rerun);
set("DRYRUN",           flags.dryRun);
set("PERCENTAGE",       percentage);
set("TIMEOUT",          timeout);
set("SLOWMO",           slowMo);

// AI
set("AI",          flags.ai);
set("AI_URL",      aiURL);
set("AI_MODEL",    aiModel);
set("AI_KEY",      aiKey);
set("AI_LANGUAGE", aiLanguage);
set("MAX_TOKENS",  maxTokens);
set("MAX_REPORTS", maxReports);


async function main() {
  if (flags.reportHelp)    return showReportingHelp();
  if (flags.browserHelp)   return showBrowserHelp();
  if (flags.executionHelp) return showExecutionHelp();
  if (flags.aiHelp)        return showAIHelp();

  if (flags.help) return showHelp();
  if (flags.version) return showVersion();
  if (flags.create) return createProject(flags.createYes, flags.noDeps);


  runTests();

  const testPercentage = process.env.PERCENTAGE ? Number(process.env.PERCENTAGE) : artesConfig.testPercentage || 0;

  const testCoverage = testCoverageCalculator({ percentage: testPercentage });

  if (!testCoverage) {
    cleanUp();
    process.exit(1);
  }
  
  if (testCoverage.totalTests === 0) {
    cleanUp();
    process.exit(process.env.EXIT_CODE);
  }
  
  logPomWarnings();

  findDuplicateTestNames();

  const source = path.join(process.cwd(), "node_modules", "artes",  "@rerun.txt" );
  const destination = path.join(process.cwd(), "@rerun.txt");
  if (fs.existsSync(source)) { fs.renameSync(source, destination)}

    if (shouldReport) {
      getExecutor();
      getEnvInfo();
      generateReport();
    }

    const traceEnabled = process.env.TRACE === "true" || artesConfig.trace || false;
    if (!traceEnabled) {
      fs.rmSync(path.join(process.cwd(), "traces"), { recursive: true, force: true });
    }

  try {
    if (flags.uploadReport || artesConfig.uploadReport) {
        await uploadReport({
          reporterURL: reporterURL || artesConfig.reporterURL,
          projectName: projectName || artesConfig.projectName || "Artes Report",
          projectType: projectType || artesConfig.projectType || "Artes",
          reportName:  reportName  || artesConfig.reportName  || "Artes Report",
          reportPath:  reportPath  || artesConfig.reportPath  || path.join(process.cwd(), "report.zip")
        });
    }
  } catch (err) {
    console.error("Upload failed:", err.message);
  } finally {
    cleanUp();
    process.exit(process.env.EXIT_CODE);
  }

}

main();
