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
const { invokeBrowser } = require("../helper/contextManager/browserManager");
const { invokeRequest } = require("../helper/contextManager/requestManager");
const {
  pomCollector
} = require("../helper/controller/pomCollector");
const cucumberConfig = require("../../cucumber.config");
const { context } = require("./context");
const fs = require("fs");
const path = require("path");
const { moduleConfig, saveVar } = require("artes/src/helper/imports/commons");
require("allure-cucumberjs");
const allure = require("allure-js-commons");

const statusDir = path.join(process.cwd(), "testsStatus");
const HTTP_METHODS = ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"];

/* ------------------- Helpers ------------------- */

setDefaultTimeout(cucumberConfig.default.timeout);

async function attachResponse(attachFn) {
  if (!context.response) return;

  for (const [key, value] of Object.entries(context.response)) {
    const text =
      typeof value === "object"
        ? `${key}:\n${JSON.stringify(value, null, 2)}`
        : `${key}:\n${value}`;

    await attachFn(key, text, "text/plain");
  }
}

function saveTestStatus(result, pickle) {

  fs.mkdirSync(statusDir, { recursive: true });
  
   const now = new Date();
   const YYYY = now.getFullYear();
   const MM = String(now.getMonth() + 1).padStart(2, '0');
   const DD = String(now.getDate()).padStart(2, '0');
   const hh = String(now.getHours()).padStart(2, '0');
   const mm = String(now.getMinutes()).padStart(2, '0');
   const ss = String(now.getSeconds()).padStart(2, '0');
   const ms = String(now.getMilliseconds()).padStart(3, '0');

   const timestamp = `${YYYY}${MM}${DD}-${hh}${mm}${ss}-${ms}`;

   const fileName = `${result.status}-${pickle.name}-${pickle.id}-${timestamp}.txt`;

   const filePath = path.join(statusDir, fileName);

  fs.writeFileSync(filePath, "");

}

const projectHooksPath = path.resolve(
  moduleConfig.projectPath,
  "tests/steps/hooks.js",
);

let projectHooks = {};

if (fs.existsSync(projectHooksPath)) {
  try {
    projectHooks = require(projectHooksPath);
  } catch (err) {
    console.warn("⚠️ Failed to load project hooks.js:", err.message);
  }
} else {
  projectHooks = {};
}

/* ------------------- Hooks ------------------- */

BeforeAll(async () => {
  if (typeof projectHooks.BeforeAll === "function") {
    await projectHooks.BeforeAll();
  }

  pomCollector();
});

Before(async function ({pickle}) {
  context.vars = {};

  const vars = await cucumberConfig.variables

  if (vars && typeof vars === "object") {
    for (let [key, value] of Object.entries(vars)) {

       saveVar(value, key);
    }
  }

  const envFilePath = path.join(
    moduleConfig.projectPath,
    "tests",
    "environment_variables",
    `${cucumberConfig.env}.env.json`,
  );

  if (fs.existsSync(envFilePath)) {
    let env_vars = fs.readFileSync(envFilePath, "utf-8");
    try {
      env_vars = JSON.parse(env_vars);
      context.vars = { ...context.vars, ...env_vars };
    } catch (err) {
      console.error("Error parsing environment variables JSON:", err);
    }
  }

  const { browser, context: browserContext } = await invokeBrowser();
  const requestInstance = await invokeRequest();

  context.browser = browser;
  context.browserContext = browserContext;
  context.page = await browserContext.newPage();
  context.request = requestInstance;

  await context.page.setDefaultTimeout(cucumberConfig.default.timeout);

  if (cucumberConfig.default.reportWithTrace || cucumberConfig.default.trace) {
    await browserContext.tracing.start({
      title: pickle.name,
      sources: true,
      screenshots: true,
      snapshots: true,
    });
  }

  if (typeof projectHooks.Before === "function") {
    await projectHooks.Before();
  }
});

BeforeStep(async ({ pickleStep }) => {
  if (HTTP_METHODS.some((method) => pickleStep.text.includes(method))) {
    context.response = {};
  }

  if (typeof projectHooks.BeforeStep === "function") {
    await projectHooks.BeforeStep();
  }
});

AfterStep(async function ({ pickleStep }) {
  if (typeof projectHooks.AfterStep === "function") {
    await projectHooks.AfterStep();
  }

  if (HTTP_METHODS.some((method) => pickleStep.text.includes(method))) {
    await attachResponse(allure.attachment);
  }
});

After(async function ({result, pickle}) {
  if (typeof projectHooks.After === "function") {
    await projectHooks.After();
  }

  const shouldReport =
    cucumberConfig.default.successReport || result?.status !== Status.PASSED;

  if (shouldReport & (context.page.url() !== "about:blank")) {
    const screenshotBuffer = await context.page.screenshot({ type: "png" });

    await allure.attachment("Screenshot", screenshotBuffer, "image/png");
  }

  if(cucumberConfig.default.testPercentage>0) saveTestStatus(result, pickle);

  if (cucumberConfig.default.reportWithTrace || cucumberConfig.default.trace) {
    var tracePath = path.join(
      moduleConfig.projectPath,
      `./traces/${pickle.name.replaceAll(" ", "_")}-${pickle.id}.zip`,
    );
  }

  if (
    (cucumberConfig.default.reportWithTrace || cucumberConfig.default.trace) &&
    shouldReport &&
    context.page.url() !== "about:blank"
  ) {
    await context.browserContext.tracing.stop({
      path: tracePath,
    });

    if (cucumberConfig.default.reportWithTrace) {
      await allure.attachTrace("Trace", tracePath);

    }
  }

  await attachResponse(allure.attachment);
  context.response = await {};

  await context.page?.close();
  await context.browserContext?.close();
  await context.browser?.close();
  await context.request?.dispose();

  if (
    shouldReport &&
    context.page.video &&
    context.page.url() !== "about:blank"
  ) {
    const video = context.page.video();
    if (video) {
      const videoPath = await video.path();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (fs.existsSync(videoPath)) {
        const webmBuffer = fs.readFileSync(videoPath);
        await allure.attachment("Screenrecord", webmBuffer, "video/webm");
      }
    }
  }
});

AfterAll(async () => {
  if (typeof projectHooks.AfterAll === "function") {
    await projectHooks.AfterAll();
  }

});
