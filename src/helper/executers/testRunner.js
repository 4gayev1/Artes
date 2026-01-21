const { spawnSync } = require("child_process");
const { moduleConfig } = require("../imports/commons");
const path = require("path");

function runTests() {
  try {
    console.log("🧪 Running tests...");
    process.env.FORCE_COLOR = "1";
    process.env.FORCE_STDIO_TTY = "1";

    spawnSync("cucumber-js", ["--config=cucumber.config.js", `${process.env.RERUN ? path.join("../../", process.env.RERUN) : ""}`], {
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
    console.log("✅ Tests running completed successfully!");
  } catch (error) {
    console.error("❌ Test execution failed:", error);
    process.env.EXIT_CODE = 1;
  }
}

module.exports = {
  runTests,
};
