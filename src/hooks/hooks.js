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
const { pomCollector } = require("../helper/pomController/pomCollector");
const cucumberConfig = require("../../cucumber.config");
const { context } = require("./context");
const fs = require("fs");

let browser;
let request;

setDefaultTimeout(cucumberConfig.default.cucumberTimeout * 1000);

BeforeAll(async function () {
  browser = await invokeBrowser();
  request = await invokeRequest();

  pomCollector();

  //  browser.tracing.start({
  //   sources: true,
  //   screenshots: true,
  //   snapshots: true,
  // });
});

Before(async function () {
  context.page = await browser.newPage();
  context.request = await request;
});

After(async function ({ pickle, result }) {
  let img;

  if (result?.status != Status.PASSED) {
    img = await context.page.screenshot({
      path: `./test-results/visualReport/${pickle.name}/${pickle.name}.png`,
      type: "png",
    });
    await this.attach(img, "image/png");
  }

  await context.page.close();
  // await browser.tracing.stop({ path: 'trace.zip' });
  if (result?.status != Status.PASSED) {
    const videoPath = await context.page.video().path();
    const webmBuffer = await fs.readFileSync(videoPath);
    await this.attach(webmBuffer, "video/webm");
  }
});

AfterAll(function () {
  browser.close();
});
