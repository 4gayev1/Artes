const os = require("os");
const fs = require("fs");
const path = require("path");
const { moduleConfig } = require("artes/src/helper/imports/commons");

async function getEnvInfo() {
  delete require.cache[require.resolve("../../../cucumber.config.js")];
  const cucumberConfig = require("../../../cucumber.config.js");

  let baseURL = "";

  if (typeof cucumberConfig.baseURL === "object") {
    const env = (cucumberConfig.env || "").trim();
    baseURL = cucumberConfig.baseURL[env];
  } else {
    baseURL = cucumberConfig.baseURL;
  }

  if (fs.existsSync(path.join(moduleConfig.modulePath, "browser-info.json"))) {
    browserInfo = JSON.parse(
      fs.readFileSync(
        path.join(moduleConfig.modulePath, "browser-info.json"),
        "utf8",
      ),
    );
  }

  const environment = {
    // ── System ──────────────────────────────
    OS_Name: os.type(),
    OS_Version: os.release(),
    OS_Platform: process.platform,
    OS_Arch: os.arch(),
    CPU_Cores: os.cpus().length,
    CPU_Model: os.cpus()[0]?.model ?? "N/A",
    RAM_Total: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
    RAM_Free: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
    Hostname: os.hostname(),

    // ── Node ────────────────────────────────
    Node_Version: process.version,
    NPM_Version: process.env.npm_config_user_agent ?? "N/A",
    Working_Dir: process.cwd(),

    // ── Browser ─────────────────────────────
    Browser_Name: cucumberConfig.browser.browserType,
    Browser_Version: browserInfo.BROWSER_VERSION,
    Screen_Size: `w: ${browserInfo.BROWSER_WIDTH}px h:${browserInfo.BROWSER_HEIGHT}px`,
    Headless: cucumberConfig.browser.headless ?? "N/A",

    // ── Test Config ─────────────────────────
    Base_URL: baseURL || "N/A",
    Environment: cucumberConfig.env || "local",
    Parallel_Runner: cucumberConfig.default.parallel,
    Timeout: cucumberConfig.default.timeout ?? "N/A",

    // ── Git ─────────────────────────────────
    Git_Branch: process.env.GIT_BRANCH ?? process.env.BRANCH_NAME ?? "N/A",
    Git_Commit: process.env.GIT_COMMIT ?? process.env.GIT_SHA ?? "N/A",
    Git_Author: process.env.GIT_AUTHOR ?? "N/A",

    // ── Timestamps ──────────────────────────
    Run_Date: new Date().toLocaleDateString(),
    Run_Time: new Date().toLocaleTimeString(),
    Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  const allureResultsDir = path.join(moduleConfig.modulePath, "allure-result");

  if (!fs.existsSync(allureResultsDir)) {
    fs.mkdirSync(allureResultsDir, { recursive: true });
  }

  const propertiesContent = Object.entries(environment)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  fs.writeFileSync(
    path.join(allureResultsDir, "environment.properties"),
    propertiesContent,
  );

  return environment;
}

module.exports = { getEnvInfo };
