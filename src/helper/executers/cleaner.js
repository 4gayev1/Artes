const { moduleConfig } = require("../imports/commons");
const fs = require("fs");
const path = require("path");

function cleanUp() {
  try {

   for (const p of moduleConfig.cleanUpPaths) {
      const fullPath = path.join(moduleConfig.modulePath, p);

      fs.rmSync(fullPath, {
        recursive: true,
        force: true,
      });
}

  } catch (error) {
    console.error("❌ Error in cleanup:", error.message);
    process.env.EXIT_CODE = 1;
  }
}

module.exports = {
  cleanUp
};