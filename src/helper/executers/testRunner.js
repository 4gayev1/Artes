const { spawnSync } = require("child_process");
const { moduleConfig } = require("../imports/commons");
const path = require("path");

function runTests() {
  try {
    console.log("🧪 Running tests...");

    spawnSync(
      "cucumber-js",
      [ "--config=cucumber.config.js"],
      {
        cwd: moduleConfig.modulePath,
        stdio: "inherit",
        shell: true,
        env: {
          ...process.env,
          FORCE_TTY: "1",
          FORCE_COLOR: "1",
          CI: "false",
        },
      },
    );
    console.log("✅ Tests running completed successfully!");
  } catch (error) {
    console.error("❌ Test execution failed:", error);
    process.env.EXIT_CODE = 1;
  }
}

module.exports = {
  runTests,
};
