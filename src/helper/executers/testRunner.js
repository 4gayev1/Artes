const { spawnSync } = require("child_process");
const { moduleConfig } = require("../imports/commons");

function runTests(flag) {

  flag ? process.env.REPORT_FORMAT = JSON.stringify(["rerun:@rerun.txt", "allure-cucumberjs/reporter"]) : "";

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
