#!/usr/bin/env node
const { showHelp } = require("./src/helper/executers/helper");
const { showVersion } = require("./src/helper/executers/versionChecker");
const { createProject } = require("./src/helper/executers/projectCreator");
const { runTests } = require("./src/helper/executers/testRunner");
const { generateReport } = require("./src/helper/executers/reportGenerator");
const { cleanUp } = require("./src/helper/executers/cleaner");

const args = process.argv.slice(2);

const flags = {
  help: args.includes("-h") || args.includes("--help"),
  version: args.includes("-v") || args.includes("--version"),
  create: args.includes("-c") || args.includes("--create"),
  createYes: args.includes("-y") || args.includes("--yes"),
  report: args.includes("-r") || args.includes("--report"),
};

function main() {
  if (flags.help) {
    showHelp();
    return;
  }

  if (flags.version) {
    showVersion();
    return;
  }

  if (flags.create) {
    createProject(flags.createYes);
    return;
  }

  if (flags.report) {
    runTests();
    generateReport();
    cleanUp();
  } else {
    runTests();
    cleanUp();
  }
}

main();
