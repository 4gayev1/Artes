const { addElements } = require("./elementController");
const cucumberConfig = require("../../../cucumber.config");
const fs = require("fs");
const path = require("path");
const { moduleConfig } = require("../../helper/imports/commons");

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
          `${key} in ${file} has the same key with ${key} in ${keyRegistry[key]}`,
        );
      } else {
        keyRegistry[key] = file;
      }
    });

    addElements(parsed);
  });

  const duplicationFilePath = path.join(
    moduleConfig.projectPath,
    "node_modules",
    "artes",
    "pomDuplicateWarnings.json",
  );

  if (duplicateWarnings.length > 0) {
    fs.mkdirSync(path.dirname(duplicationFilePath), { recursive: true });
    fs.writeFileSync(
      duplicationFilePath,
      JSON.stringify(duplicateWarnings, null, 2),
      "utf8",
    );
  }
}

function logPomWarnings() {
  if (
    !fs.existsSync(
      path.join(moduleConfig.modulePath, "pomDuplicateWarnings.json"),
    )
  )
    return;

  const duplicateWarnings = JSON.parse(
    fs.readFileSync(
      path.join(moduleConfig.modulePath, "pomDuplicateWarnings.json"),
      "utf8",
    ),
  );

  console.warn(
    "\n\x1b[33m[WARNING] POM DUPLICATE KEY WARNINGS:  This may break your tests or cause flaky behavior.",
  );

  duplicateWarnings.forEach((warning) => {
    console.warn(`- ${warning}`);
  });

  console.log("\x1b[0m");
}

module.exports = { pomCollector, logPomWarnings };
