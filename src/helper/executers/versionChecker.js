const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

function showVersion() {
  const artesVersion = execSync("npm root -g").toString().trim();
  const artesGPackageJSONPath = path.join(artesVersion, "artes/package.json");
  const asrtesGPackageJSON = JSON.parse(
    fs.readFileSync(artesGPackageJSONPath, "utf8"),
  );
  console.log(`ARTES Version: ${asrtesGPackageJSON.version}`);
}

module.exports = {
  showVersion,
};
