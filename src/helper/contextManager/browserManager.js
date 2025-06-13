const { chromium, firefox, webkit } = require("playwright");
const cucumberConfig = require("../../../cucumber.config.js");

const invokeBrowser = async () => {
  let browser;

  let baseURL = "";

  if (typeof cucumberConfig.baseURL === "object") {
    if (
      cucumberConfig.env != "" ||
      cucumberConfig.env != undefined ||
      cucumberConfig.env != null
    ) {
      baseURL = cucumberConfig.baseURL[cucumberConfig.env.trim()];
    } else {
      baseURL =
        cucumberConfig.baseURL[Object.keys(cucumberConfig.baseURL)[0].trim()];
    }
  } else {
    baseURL = cucumberConfig.baseURL;
  }

  const options = {
    headless: cucumberConfig.browser.headless,
    args: [cucumberConfig.browser.maximizeScreen ? "--start-maximized" : ""],
  };

  const browserType =
    cucumberConfig.browser.browserType.toLowerCase() || "chrome";

  const browserContextOptions = {
    baseURL: baseURL,
    viewport: cucumberConfig.browser.maximizeScreen
      ? null
      : cucumberConfig.browser.viewport,
    recordVideo: {
      dir: "./test-results/visualReport/",
      size: cucumberConfig.browser.viewport,
    },
    ignoreHTTPSErrors: true,
  };

  switch (browserType) {
    case "chrome":
      browser = await chromium.launch(options);
      break;
    case "firefox":
      browser = await firefox.launch(options);
      break;
    case "webkit":
      browser = await webkit.launch(options);
      break;
    default:
      throw new Error(
        "Please set the proper browser!\n Options: chrome, firefox, webkit",
      );
  }

  const context = await browser.newContext(browserContextOptions);
  
  return {
    browser: browser,
    context: context
  };
};

module.exports = {
  invokeBrowser,
};