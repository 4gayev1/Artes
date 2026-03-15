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
const { pomCollector } = require("../helper/controller/pomCollector");
const cucumberConfig = require("../../cucumber.config");
const { context } = require("./context");
const fs = require("fs");
const path = require("path");
const { moduleConfig, saveVar } = require("artes/src/helper/imports/commons");
require("allure-cucumberjs");
const allure = require("allure-js-commons");
const ffprobe = require("ffprobe-static");
const ffmpegPath = require("ffmpeg-static");
const { execSync } = require("child_process");
const { attachAiBugReport } = require("artes/src/helper/controller/aiBugReporter");


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

    await attachFn(key, text, "application/json");
  }
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

Before(async function ({ pickle }) {
  context.vars = {};

  const vars = await cucumberConfig.variables;

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

  const dimensions = await context.page.evaluate(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  fs.writeFileSync(
    path.join(moduleConfig.modulePath, "browser-info.json"),
    JSON.stringify({
      BROWSER_WIDTH: dimensions.width,
      BROWSER_HEIGHT: dimensions.height,
      BROWSER_VERSION: browser.version(),
    }),
  );

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

After(async function ({ result, pickle }) {
  if (typeof projectHooks.After === "function") {
    await projectHooks.After();
  }

  
  const shouldReport =
    cucumberConfig.default.successReport || result?.status !== Status.PASSED;
    
  await attachResponse(allure.attachment);

if (shouldReport && cucumberConfig.ai.ai) {
    await attachAiBugReport({
      result,
      pickle,
      response: context.response,
      language: cucumberConfig.ai.language,
      url: cucumberConfig.ai.url,
      aiModel: cucumberConfig.ai.model,
      aiKey: cucumberConfig.ai.key,
      maxReports: cucumberConfig.ai.maxReports
    });
  }


  context.response = await {};

  Object.keys(context.vars).length > 0 &&
    allure.attachment(
      "Variables",
      JSON.stringify(context.vars, null, 2),
      "application/json",
    );


  if (shouldReport & (context.page.url() !== "about:blank")) {
    const screenshotBuffer = await context.page.screenshot({ type: "png" });

    await allure.attachment("Screenshot", screenshotBuffer, "image/png");
  }

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
        const trimmedPath = videoPath.replace(".webm", "-trimmed.webm");

        const isTimeoutError = result.message?.includes(
          "Error: function timed out, ensure the promise resolves within",
        );

        if (isTimeoutError) {
          const duration = parseFloat(
            execSync(
              `"${ffprobe.path}" -v error -show_entries format=duration -of csv=p=0 "${videoPath}"`,
            )
              .toString()
              .trim(),
          );

          const timeoutSeconds = cucumberConfig.default.timeout / 1000;
          const newDuration = Math.max(duration - timeoutSeconds + 3, 1);

          execSync(
            `"${ffmpegPath}" -loglevel quiet -i "${videoPath}" -t ${newDuration} -c copy "${trimmedPath}" -y`,
          );

          const webmBuffer = fs.readFileSync(trimmedPath);
          await allure.attachment("Screenrecord", webmBuffer, "video/webm");
        } else {
          const webmBuffer = fs.readFileSync(videoPath);
          await allure.attachment("Screenrecord", webmBuffer, "video/webm");
        }
      }
    }
  }
});

AfterAll(async () => {
  if (typeof projectHooks.AfterAll === "function") {
    await projectHooks.AfterAll();
  }
});
