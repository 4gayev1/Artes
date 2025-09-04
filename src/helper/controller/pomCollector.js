const { addElements } = require("./elementController");
const cucumberConfig = require("../../../cucumber.config");
const fs = require("fs");
function pomCollector() {
  if (fs.existsSync(cucumberConfig.default.pomPath)) {
    fs.readdir(`${cucumberConfig.default.pomPath}`, (err, files) => {
      files.forEach((file) => {
        fs.readFile(
          `${cucumberConfig.default.pomPath}/${file}`,
          "utf-8",
          (err, content) => {
            try {
              addElements(JSON.parse(content));
            } catch (error) {
              console.log(`Error parsing POM file ${file}:`, error.message);
            }
          },
        );
      });
    });
  }
}

module.exports = { pomCollector };
