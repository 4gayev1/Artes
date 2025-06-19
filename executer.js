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
  trace: args.includes("-t") || args.includes("--trace"),
  features: args.includes("--features"),
  tags: args.includes("--tags"),
  env: args.includes("--env"),
  headless: args.includes("--headless"),
  parallel: args.includes("--parallel"),
  retry: args.includes("--retry"),
  dryrun: args.includes("--dryrun"),
  percentage: args.includes("--percentage"),
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
    const result = runTests(args, flags)
    generateReport();
    cleanUp();
    process.exit(result.status);
} else {
  const result = runTests(args, flags);
  cleanUp();
  process.exit(result.status);
}
}

main();
