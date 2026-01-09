const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const { spawnSync } = require("child_process");
const { moduleConfig } = require("../imports/commons");

function generateReport() {
  try {
    console.log("📊 Generating report...");

    spawnSync(
      "allure",
      [
        "generate",
        "--clean",
        `${process.env.SINGLE_FILE_REPORT == "true" ? "--single-file" : ""}`,
        "allure-result",
        "--output",
        moduleConfig.reportPath,
      ],
      {
        cwd: moduleConfig.modulePath,
        stdio: "ignore",
        shell: true,
      },
    );

    console.log(
      `📋 Report generated successfully in ${moduleConfig.reportPath}!`,
    );

    if (fs.existsSync(moduleConfig.reportPath) && process.env.ZIP) {
      console.log(`🗜️ Zipping report folder`);

      const zipPath = path.join(
        path.dirname(moduleConfig.reportPath),
        "report.zip",
      );

      let done = false;
      let error = null;

      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", () => {
        done = true;
      });

      archive.on("error", (err) => {
        error = err;
        done = true;
      });

      archive.pipe(output);
      archive.directory(moduleConfig.reportPath, false);
      archive.finalize();

      require("deasync").loopWhile(() => !done);

      console.log(`🗜️ Zipped in ${moduleConfig.reportPath}/report.zip!`);
      if (error) throw error;
    } else {
      console.warn(
        `⚠️ Report folder does not exist: ${moduleConfig.reportPath}`,
      );
    }
  } catch (err) {
    console.error("❌ Report generation failed:", err);
    process.env.EXIT_CODE = 1;
  }
}

module.exports = { generateReport };
