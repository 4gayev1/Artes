const { addElements } = require("./elementController");
const cucumberConfig = require("../../../cucumber.config");
const fs = require("fs");
const path = require("path");

const duplicateWarnings = [];
const keyRegistry = {};

function pomCollector() {
  const pomPath = cucumberConfig.default.pomPath;

  if (!fs.existsSync(pomPath)) return;

  fs.readdirSync(pomPath).forEach((file) => {
    const filePath = path.join(pomPath, file);

    let parsed;
    try {
      parsed = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
      console.log(`Error parsing POM file ${file}: ${error.message}`);
      return;
    }

    Object.keys(parsed).forEach((key) => {
      if (keyRegistry[key]) {
        duplicateWarnings.push(
          `${key} in ${file} has the same key with ${key} in ${keyRegistry[key]}`
        );
      } else {
        keyRegistry[key] = file;
      }
    });

    addElements(parsed);
  });
}

function logPomWarnings() {
  if (duplicateWarnings.length === 0) return;

  console.warn(
    "\n\x1b[33m[WARNING] POM DUPLICATE KEY WARNINGS:  This may break your tests or cause flaky behavior."
  ); 
  
  duplicateWarnings.forEach((warning) => {
    console.warn(`- ${warning}`);
  });

  console.log("\x1b[0m")
}

module.exports = { pomCollector, logPomWarnings };
