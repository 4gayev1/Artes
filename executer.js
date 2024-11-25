#!/usr/bin/env node

const {
  showHelp,
  showVersion,
  createProject,
  runTests,
  generateReport,
  cleanUp,
  tracer,
} = require("./src/helper/executers/exporter");

const args = process.argv.slice(2);

const flags = {
  help: args.includes("-h") || args.includes("--help"),
  version: args.includes("-v") || args.includes("--version"),
  create: args.includes("-c") || args.includes("--create"),
  createYes: args.includes("-y") || args.includes("--yes"),
  report: args.includes("-r") || args.includes("--report"),
  trace: args.includes("-t") || args.includes("--trace"),
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

  // if (flags.trace) {
  //   runTests();
  //   tracer();
  //   cleanUp();
  // }

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
