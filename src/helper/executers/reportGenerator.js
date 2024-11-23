const { spawnSync } = require("child_process");
const { moduleConfig } = require("../imports/commons");

function generateReport() {
  try {
    console.log("📊 Generating report...");

    const result = spawnSync(
      "npm",
      ["run", "testWithReport", moduleConfig.reportPath],
      {
        cwd: moduleConfig.modulePath,
        stdio: "ignore",
        shell: true,
      },
    );

    if (result.error) {
      throw result.error;
    }

    console.log(
      `📋 Report generated successfully in ${moduleConfig.reportPath}!`,
    );
  } catch (error) {
    console.error("❌ Report generation failed:", error);
    process.exit(1);
  }
}

module.exports = {
  generateReport,
};
