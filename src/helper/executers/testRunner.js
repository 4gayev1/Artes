const { spawnSync } = require("child_process");
const { moduleConfig } = require("../imports/commons");
const path = require("path");

function runTests(flagReport, flagTags, flagFeatures, flagEnv) {
  const args = process.argv.slice(2);

  const env = args[args.indexOf("--env") + 1];

  const featureFiles = args[args.indexOf("--features") + 1];
  const features =
    flagFeatures &&
    featureFiles
      .split(",")
      .map((f) => path.join(moduleConfig.featuresPath, `${f.trim()}.feature`));

  const tags = args[args.indexOf("--tags") + 1];

  flagEnv && console.log("Running env:", env);
  flagEnv ? (process.env.ENV = JSON.stringify(env)) : "";

  flagReport
    ? (process.env.REPORT_FORMAT = JSON.stringify([
        "rerun:@rerun.txt",
        "allure-cucumberjs/reporter",
      ]))
    : "";

  flagTags && console.log("Running tags:", tags);
  flagTags ? (process.env.RUN_TAGS = JSON.stringify(tags)) : "";

  flagFeatures && console.log("Running features:", features);
  flagFeatures ? (process.env.FEATURES = JSON.stringify(features)) : "";

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
