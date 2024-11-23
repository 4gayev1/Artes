const fs = require("fs");
const { moduleConfig } = require("../imports/commons");

function showVersion() {
  const packageJson = JSON.parse(
    fs.readFileSync(moduleConfig.modulePackageJsonPath, "utf-8"),
  );
  console.log(`📌 Artes version: ${packageJson.version}`);
}

module.exports = {
  showVersion,
};
