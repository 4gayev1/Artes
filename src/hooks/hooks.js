const {
  BeforeAll,
  Before,
  After,
  Status,
  setDefaultTimeout,
  AfterStep,
  BeforeStep,
  AfterAll,
} = require("@cucumber/cucumber");
const { spawnSync } = require("child_process");
const { invokeBrowser } = require("../helper/contextManager/browserManager");
const { invokeRequest } = require("../helper/contextManager/requestManager");
const { pomCollector } = require("../helper/controller/pomCollector");
const cucumberConfig = require("../../cucumber.config");
const { context } = require("./context");
const fs = require("fs");
const { moduleConfig } = require("artes/src/helper/imports/commons");
const path = require("path");


const statusDir = path.join(process.cwd(), "testsStatus");
const HTTP_METHODS = ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"];

setDefaultTimeout(cucumberConfig.default.timeout);

/* ------------------- Helpers ------------------- */

let artesConfig = {};

try {
  if (fs.existsSync(moduleConfig.cucumberConfigPath)) {
    const artesConf = require(moduleConfig.cucumberConfigPath);
    artesConfig = artesConf || {};
  }
} catch (error) {
  console.warn("Error reading config file:", error.message);
  console.log("Proceeding with default config.");
}

async function attachResponse(attachFn) {
  if (!context.response) return;

  for (const [key, value] of Object.entries(context.response)) {
    const text =
      typeof value === "object"
        ? `${key}:\n${JSON.stringify(value, null, 2)}`
        : `${key}:\n${value}`;

    await attachFn(text, "text/plain");
  }
}

function saveTestStatus(result, pickle) {
  fs.mkdirSync(statusDir, { recursive: true });
  fs.writeFileSync(path.join(statusDir, `${result.status}-${pickle.id}.txt`), "");
}

/* ------------------- Hooks ------------------- */

BeforeAll(() => {
  pomCollector();
});

Before(async function () {
  context.vars = {};

  const { browser, context: browserContext } = await invokeBrowser();
  const requestInstance = await invokeRequest();

  context.browser = browser;
  context.browserContext = browserContext;
  context.page = await browserContext.newPage();
  context.request = requestInstance;

  await context.page.setDefaultTimeout(cucumberConfig.default.timeout);

  if (process.env.TRACE || process.env.REPORT_WITH_TRACE) {
    await browserContext.tracing.start({
      sources: true,
      screenshots: true,
      snapshots: true,
    });
  }
});

BeforeStep(({ pickleStep }) => {
  if (HTTP_METHODS.some((method) => pickleStep.text.includes(method))) {
    context.response = {};
  }
});

AfterStep(async function ({ pickleStep }) {
  if (HTTP_METHODS.some((method) => pickleStep.text.includes(method))) {
    await attachResponse(this.attach);
  }
});

After(async function ({ pickle, result }) {
  const shouldReport =
    (artesConfig.successReport || result?.status !== Status.PASSED) &&
    !context.request;

  if (shouldReport) {
    const screenshotPath = path.join(
      "test-results",
      "visualReport",
      pickle.name,
      `${pickle.name}.png`,
    );

    const img = await context.page.screenshot({ path: screenshotPath, type: "png" });
    await this.attach(img, "image/png");
  }

  saveTestStatus(result, pickle);

  if ((artesConfig.reportWithTrace || artesConfig.trace) && !context.request) {
      await context.browserContext.tracing.stop({
        path: path.join(moduleConfig.projectPath, `./${pickle.name}.zip`),
      });
      
      if(artesConfig.reportWithTrace){
      await this.attach(`./${pickle.name}.zip`, "application/zip");
      spawnSync("npm", ["run", "clean", `./${pickle.name}.zip`], {
        cwd: moduleConfig.modulePath,
        stdio: "ignore",
        shell: true,
      });
    }

  }

  await attachResponse(this.attach);

  await context.page?.close();
  await context.browserContext?.close();
  await context.browser?.close();
  await context.request?.dispose();

  if (shouldReport && context.page.video) {
    const video = context.page.video();
    if (video) {
      const videoPath = await video.path();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (fs.existsSync(videoPath)) {
        const webmBuffer = fs.readFileSync(videoPath);
        await this.attach(webmBuffer, "video/webm");
      }
    }
  }
});

AfterAll(() => {
  if (!fs.existsSync(statusDir)) return;

  const files = fs.readdirSync(statusDir);
  const passedCount = files.filter((f) => f.split("-")[0] === "PASSED").length;
  const totalTests = files.length;
  const successPercentage = (passedCount / totalTests) * 100;

  if (cucumberConfig.default.testPercentage !== undefined) {
    const meetsThreshold =
      successPercentage >= cucumberConfig.default.testPercentage;

    if (meetsThreshold) {
      console.log(
        `✅ Tests passed required ${cucumberConfig.default.testPercentage}% success rate with ${successPercentage.toFixed(2)}%!`,
      );
      fs.writeFileSync(path.join(process.cwd(), "EXIT_CODE.txt"), "0");
    } else {
      console.log(
        `❌ Tests failed required ${cucumberConfig.default.testPercentage}% success rate with ${successPercentage.toFixed(2)}%!`,
      );
      fs.writeFileSync(path.join(process.cwd(), "EXIT_CODE.txt"), "1");
    }
  }
});
