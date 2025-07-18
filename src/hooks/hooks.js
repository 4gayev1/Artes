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
const { pomCollector } = require("../helper/pomController/pomCollector");
const cucumberConfig = require("../../cucumber.config");
const { context } = require("./context");
const fs = require("fs");
const { moduleConfig } = require("artes/src/helper/imports/commons");
const path = require("path");

const statusDir = path.join(process.cwd(), "testsStatus");

setDefaultTimeout(cucumberConfig.default.timeout);

BeforeAll(async function () {
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

  await context.browserContext.tracing.start({
    sources: true,
    screenshots: true,
    snapshots: true,
  });
});

BeforeStep(async function ({ pickleStep }) {
  const stepText = pickleStep.text;

  const methods = ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"];

  if (methods.some((method) => stepText.includes(method))) {
    context.response = {};
  }
});

AfterStep(async function ({ pickleStep }) {
  const stepText = pickleStep.text;

  const methods = ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"];

  if (methods.some((method) => stepText.includes(method))) {
    if (await context.response) {
      for (const [key, value] of Object.entries(context.response)) {
        let text = `${key}:\n`;

        if (typeof value === "object") {
          text += JSON.stringify(value, null, 2);
        } else {
          text += value;
        }

        await this.attach(text, "text/plain");
      }
    }
  }
});

After(async function ({ pickle, result }) {
  if (process.env.REPORT_SUCCESS || result?.status !== Status.PASSED) {
    let img = await context.page.screenshot({
      path: `./test-results/visualReport/${pickle.name}/${pickle.name}.png`,
      type: "png",
    });
    await this.attach(img, "image/png");
  }

  fs.mkdirSync(statusDir, { recursive: true });

  fs.writeFileSync(
    path.join(statusDir, `${result.status}-${pickle.id}.txt`),
    "",
  );

  await context.browserContext.tracing.stop({
    path: path.join(moduleConfig.projectPath, "./trace.zip"),
  });

  if (context.response) {
    for (const [key, value] of Object.entries(context.response)) {
      let text = `${key}:\n`;

      if (typeof value === "object") {
        text += JSON.stringify(value, null, 2);
      } else {
        text += value;
      }

      await this.attach(text, "text/plain");
    }
  }

  await context.page?.close();

  await context.browserContext?.close();

  await context.browser?.close();

  await context.request?.dispose();

  if (
    (process.env.REPORT_SUCCESS || result?.status !== Status.PASSED) &&
    context.page.video()
  ) {
    const videoPath = await context.page.video().path();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (fs.existsSync(videoPath)) {
      const webmBuffer = await fs.readFileSync(videoPath);
      await this.attach(webmBuffer, "video/webm");
    }
  }
});

AfterAll(async function () {
  if (fs.existsSync(statusDir)) {
    const files = fs.readdirSync(statusDir);
    const passedCount = files.filter(
      (file) => file.split("-")[0] === "PASSED",
    ).length;
    const totalTests = files.length;

    const successPercentage = (passedCount / totalTests) * 100;
    const successRate =
      successPercentage.toFixed(2) >= cucumberConfig.default.testPercentage;

    if (cucumberConfig.default.testPercentage !=0 && !isNaN(successPercentage)) {
      if (successRate) {
        console.log(
          `Tests passed required ${cucumberConfig.default.testPercentage}% success rate with ${successPercentage.toFixed(2)}% !`,
        );
        process.env.EXIT_CODE = 0;
      } else {
        console.log(
          `Tests failed at required ${cucumberConfig.default.testPercentage}% success rate with ${successPercentage.toFixed(2)}%!`,
        );
        process.env.EXIT_CODE = 1;
      }
    }
  }
});
