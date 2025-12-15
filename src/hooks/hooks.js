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
const path = require("path");
const { moduleConfig } = require("artes/src/helper/imports/commons");

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

    await attachFn(text, "text/plain");
  }
}

function saveTestStatus(result, pickle) {
  fs.mkdirSync(statusDir, { recursive: true });
  fs.writeFileSync(
    path.join(statusDir, `${result.status}-${pickle.id}.txt`),
    "",
  );
}


const projectHooksPath = path.resolve(moduleConfig.projectPath, "tests/steps/hooks.js");

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

BeforeAll(() => {
  typeof projectHooks.BeforeAll == "function" && projectHooks.BeforeAll()

  pomCollector();
});

Before(async function () {

  context.vars = {};

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

  if (
    (cucumberConfig.default.reportWithTrace || cucumberConfig.default.trace) &&
    !context.response
  ) {
    await browserContext.tracing.start({
      sources: true,
      screenshots: true,
      snapshots: true,
    });
  }

  typeof projectHooks.Before == "function" && projectHooks.Before();
});

BeforeStep(({ pickleStep }) => {
  if (HTTP_METHODS.some((method) => pickleStep.text.includes(method))) {
    context.response = {};
  }

  typeof projectHooks.BeforeStep == "function" && projectHooks.BeforeStep()
});

AfterStep(async function ({ pickleStep }) {
  typeof projectHooks.AfterStep == "function" && projectHooks.AfterStep()

  if (HTTP_METHODS.some((method) => pickleStep.text.includes(method))) {
    await attachResponse(this.attach);
  }
});

After(async function ({ pickle, result }) {
  typeof projectHooks.After == "function" && projectHooks.After()

  const shouldReport =
    (cucumberConfig.default.successReport ||
      result?.status !== Status.PASSED) &&
    !context.response;

  if (shouldReport) {
    const screenshotPath = path.join(
      "test-results",
      "visualReport",
      pickle.name,
      `${pickle.name}.png`,
    );

    const img = await context.page.screenshot({
      path: screenshotPath,
      type: "png",
    });
    await this.attach(img, {
      mediaType: "image/png",
      fileName: `${pickle.name.replaceAll(" ", "_")}.png`,
    });
  }

  saveTestStatus(result, pickle);

  const tracePath = path.join(
    moduleConfig.projectPath,
    `./${pickle.name.replaceAll(" ", "_")}.zip`,
  );

  if (
    (cucumberConfig.default.reportWithTrace || cucumberConfig.default.trace) &&
    !context.response &&
    shouldReport
  ) {
    await context.browserContext.tracing.stop({
      path: tracePath,
    });

    if (cucumberConfig.default.reportWithTrace) {
      const trace = fs.readFileSync(tracePath);

      await this.attach(trace, {
        mediaType: "application/zip",
        fileName: `${pickle.name.replace(/\s+/g, "_")}_trace.zip`,
      });

      if (!cucumberConfig.default.trace) {
        spawnSync("npx", ["rimraf", tracePath], {
          cwd: moduleConfig.projectPath,
          stdio: "inherit",
          shell: true,
        });
      }
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
        await this.attach(webmBuffer, {
          mediaType: "video/webm",
          fileName: `${pickle.name.replaceAll(" ", "_")}.webm`,
        });
      }
    }
  }

});

AfterAll(() => {
  typeof projectHooks.AfterAll == "function" && projectHooks.AfterAll()

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
