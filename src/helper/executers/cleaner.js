const { moduleConfig } = require("../imports/commons");
const { spawnSync } = require("child_process");

function cleanUp() {
  try {
    spawnSync("rimraf", [moduleConfig.cleanUpPaths], {
      cwd: moduleConfig.modulePath,
      stdio: "ignore",
      shell: true,
    });
  } catch (error) {
    console.error("❌ Error in cleanup:", error.message);
    process.env.EXIT_CODE = 1;
  }
}

module.exports = {
  cleanUp,
};
