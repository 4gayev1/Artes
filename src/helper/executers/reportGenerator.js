const { spawnSync } = require("child_process");
const { moduleConfig } = require("../imports/commons");

function generateReport() {
  try {
    console.log("📊 Generating report...");

    spawnSync("npm", ["run", "testWithReport", moduleConfig.reportPath], {
      cwd: moduleConfig.modulePath,
      stdio: "ignore",
      shell: true,
    });

    console.log(
      `📋 Report generated successfully in ${moduleConfig.reportPath}!`,
    );
  } catch (error) {
    console.error("❌ Report generation failed:", error);
    process.env.EXIT_CODE = 1;
  }
}

module.exports = {
  generateReport,
};
