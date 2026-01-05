const { spawnSync } = require("child_process");
const { moduleConfig } = require("../imports/commons");
const fs = require("fs");
const path = require("path");

function generateReport() {
  
  try {
    console.log("📊 Generating report...");

    spawnSync("allure", [ "generate", "--clean", `${process.env.SINGLE_FILE_REPORT == "true" ? "--single-file" : "" }`, "allure-result",  "--output", moduleConfig.reportPath], {
      cwd: moduleConfig.modulePath,
      stdio: "ignore",
      shell: true,
    });

    if (fs.existsSync(moduleConfig.reportPath)) {

      console.log(`🗜️ Zipping report folder to report.zip...`);

      const zipResult = spawnSync("zip", ["-r", "report.zip", path.basename(moduleConfig.reportPath)], {
        cwd: path.dirname(moduleConfig.reportPath),
        stdio: "ignore"
        });

      if (zipResult.status === 0) {
        const trueZipPath = path.join(path.dirname(moduleConfig.reportPath), 'true.zip');
        const reportZipPath = path.join(path.dirname(moduleConfig.reportPath), 'report.zip');
        
        if (fs.existsSync(trueZipPath)) {
          fs.renameSync(trueZipPath, reportZipPath);
        }
        
        console.log(`✅ Report folder zipped successfully in ${moduleConfig.reportPath}/report.zip!`);
      } else {
        console.error("❌ Failed to zip report folder");
        process.env.EXIT_CODE = 1;
      }
    } else {
      console.warn(`⚠️ Report folder does not exist: ${moduleConfig.reportPath}`);
    }

    console.log(`📋 Report generated successfully in ${moduleConfig.reportPath}!`);
  } catch (error) {
    console.error("❌ Report generation failed:", error);
    process.env.EXIT_CODE = 1;
  }
}

module.exports = {
  generateReport,
};
