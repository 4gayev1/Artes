const { spawnSync } = require("child_process");
const { moduleConfig } = require("../imports/commons");
const path = require("path");

function runTests(args, flags) {
  const env = args[args.indexOf("--env") + 1];

  const featureFiles = args[args.indexOf("--features") + 1];
  const features = flags.features && featureFiles;

  const tags = args[args.indexOf("--tags") + 1];
  const parallel = args[args.indexOf("--parallel") + 1];
  const retry = args[args.indexOf("--retry") + 1];

  flags.env && console.log("Running env:", env);
  flags.env ? (process.env.ENV = JSON.stringify(env)) : "";

  flags.report
    ? (process.env.REPORT_FORMAT = JSON.stringify([
        "rerun:@rerun.txt",
        "allure-cucumberjs/reporter",
      ]))
    : "";

  flags.tags && console.log("Running tags:", tags);
  flags.tags ? (process.env.RUN_TAGS = JSON.stringify(tags)) : "";

  flags.features && console.log("Running features:", features);
  flags.features ? (process.env.FEATURES = features) : "";

  flags.headless &&
    console.log("Running mode:", flags.headless ? "headless" : "headed");
  flags.headless ? (process.env.MODE = JSON.stringify(true)) : false;

  flags.parallel ? (process.env.PARALLEL = JSON.stringify(parallel)) : "";
  flags.retry ? (process.env.RETRY = JSON.stringify(retry)) : "";
  flags.dryrun ? (process.env.DRYRUN = JSON.stringify(true)) : "";

  try {
    console.log("🧪 Running tests...");
    process.env.FORCE_COLOR = "1";
    process.env.FORCE_STDIO_TTY = "1";

    const result = spawnSync("cucumber-js", ["--config=cucumber.config.js"], {
      cwd: moduleConfig.modulePath,
      stdio: "inherit",
      shell: true,
      env: {
        ...process.env,
        FORCE_TTY: "1",
        FORCE_COLOR: "1",
        CI: "false",
      },
    });

    console.log("✅ Tests completed successfully!");
  } catch (error) {
    console.error("❌ Test execution failed:", error);
    process.exit(1);
  }
}

module.exports = {
  runTests,
};
