const { spawnSync } = require("child_process");
const { moduleConfig } = require("../imports/commons");


function tracer() {
  try {
    console.log("🕵️‍♂️ Tracer is generating...");

    const result = spawnSync("npx", ["playwright", "show-trace", '/trace.zip'], {
      cwd: moduleConfig.modulePath,
      stdio: "inherit",
      shell: true
    });

    console.log("✅ Trace viewer is opened!"); 
  } catch (error) {
    console.error("❌ Test execution failed:", error);
    process.exit(1);
  }
}

module.exports = {
    tracer,
};
