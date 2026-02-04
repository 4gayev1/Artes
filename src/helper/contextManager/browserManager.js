const { chromium, firefox, webkit, devices } = require("playwright");
const cucumberConfig = require("../../../cucumber.config.js");

const invokeBrowser = async () => {
  let browser;

  let baseURL = "";

  if (typeof cucumberConfig.baseURL === "object") {
    const env = (cucumberConfig.env || "").trim();
    baseURL = cucumberConfig.baseURL[env];
  } else {
    baseURL = cucumberConfig.baseURL;
  }

  const options = {
    headless: cucumberConfig.browser.headless,
    slowMo: cucumberConfig.browser.slowMo,
    args: [cucumberConfig.browser.maximizeScreen ? "--start-maximized" : ""],
  };

  const browserType = cucumberConfig.browser.device ? "webkit" : cucumberConfig.browser.browserType.toLowerCase() || "chrome";

  const browserContextOptions = {
    baseURL: baseURL,
    ...(cucumberConfig.browser.device
      ? {}
      : {
          viewport: cucumberConfig.browser.maximizeScreen
            ? null
            : cucumberConfig.browser.viewport,
        }),
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


  const context = await browser.newContext({
    ...(cucumberConfig.browser.device ? devices[cucumberConfig.browser.device] : {}),
    ...browserContextOptions,
  });

  return {
    browser: browser,
    context: context,
  };
};

module.exports = {
  invokeBrowser,
};
