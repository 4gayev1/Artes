const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

function showVersion() {
  try {
    const localPath = path.join(
      process.cwd(),
      "node_modules",
      "artes",
      "package.json",
    );
    const localData = fs.readFileSync(localPath, "utf8");
    const localArtes = JSON.parse(localData);
    console.log(`ARTES Version: ${localArtes.version}`);
    return;
  } catch (err) {}

  try {
    const globalRoot = execSync("npm root -g").toString().trim();
    const globalPath = path.join(globalRoot, "artes", "package.json");
    const globalData = fs.readFileSync(globalPath, "utf8");
    const globalArtes = JSON.parse(globalData);
    console.log(`ARTES Version: ${globalArtes.version}`);
    return;
  } catch (err) {}
}

module.exports = {
  showVersion,
};
