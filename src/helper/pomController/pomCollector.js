const { addElements } = require("./elementController");
const cucumberConfig = require("../../../cucumber.config");
const fs = require("fs");
function pomCollector() {
  fs.readdir(`${cucumberConfig.default.pomPath}`, (err, files) => {
    files.forEach((file) => {
      fs.readFile(
        `${cucumberConfig.default.pomPath}/${file}`,
        "utf-8",
        (err, content) => {
          addElements(JSON.parse(content));
        },
      );
    });
  });
}

module.exports = { pomCollector };
