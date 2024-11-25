const { moduleConfig } = require("../imports/commons");
const { spawnSync } = require("child_process");

function cleanUp() {
  try {
    const result = spawnSync(
      "npm",
      ["run", "clean", moduleConfig.cleanUpPaths],
      {
        cwd: moduleConfig.modulePath,
        stdio: "ignore",
        shell: true,
      },
    );


  } catch (error) {
    console.error("❌ Error in cleanup:", error.message);
    process.exit(1);
  }
}

module.exports = {
  cleanUp,
};
