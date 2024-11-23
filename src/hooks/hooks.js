const {
  BeforeAll,
  Before,
  After,
  Status,
  setDefaultTimeout,
  AfterAll,
} = require("@cucumber/cucumber");
const { invokeBrowser } = require("../helper/contextManager/browserManager");
const { invokeRequest } = require("../helper/contextManager/requestManager");
const { context } = require("./context");
const { pomCollector } = require("../helper/pomController/pomCollector");
const fs = require("fs");
const cucumberConfig = require("../../cucumber.config");

let browser;
let request;

setDefaultTimeout(cucumberConfig.cucumberTimeout);

BeforeAll(async function () {
  browser = await invokeBrowser();
  request = await invokeRequest();

  pomCollector();

  browser.tracing.start({
    sources: true,
    screenshots: true,
    snapshots: true,
  });
});

Before(async function ({ pickle }) {
  context.page = await browser.newPage();
  context.request = await request;
});

After(async function ({ pickle, result }) {
  let img;

  if (result?.status == Status.FAILED) {
    img = await context.page.screenshot({
      path: `./test-results/visualReport/${pickle.name}/${pickle.name}.png`,
      type: "png",
    });
  }

  if (result?.status == Status.FAILED) {
    this.attach(img, "image/png");
  }

  await browser.tracing.stop({ path: "./trace.zip" });

  await context.page.close();
  await browser.close();

  if (result?.status == Status.FAILED) {
    const videoPath = await context.page.video().path();
    const webmBuffer = await fs.readFileSync(videoPath);
    await this.attach(webmBuffer, "video/webm");
  }
});

AfterAll(function () {
  browser.tracing.stop({ path: "../../trace.zip" });
});
