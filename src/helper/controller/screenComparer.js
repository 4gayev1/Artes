const path = require("path");
const fs = require("fs");
require("allure-cucumberjs");
const allure = require("allure-js-commons");
const sharp = require("sharp");
const pixelmatch = require("pixelmatch");
const { PNG } = require("pngjs");
const { moduleConfig } = require("artes/src/helper/imports/commons");

async function screenComparer(baselineFilename, screenshotFn, options = {}) {
  const { maxDiffPercent = 0.01, threshold = 0.1 } = options;

  const baselinePath = path.join(moduleConfig.projectPath, baselineFilename);
  const actualPath = path.join(
    moduleConfig.projectPath,
    "visualComparison",
    `actual_${baselineFilename}`,
  );
  const diffPath = path.join(
    moduleConfig.projectPath,
    "visualComparison",
    `diff_${baselineFilename}`,
  );

  await screenshotFn(actualPath);

  const baselineMeta = await sharp(baselinePath).metadata();
  const actualMeta = await sharp(actualPath).metadata();

  // if (baselineMeta.width !== actualMeta.width || baselineMeta.height !== actualMeta.height) {
  //   console.warn(`⚠️  Dimension mismatch! Baseline: ${baselineMeta.width}x${baselineMeta.height} | Actual: ${actualMeta.width}x${actualMeta.height}`);
  // }

  const width = actualMeta.width;
  const height = actualMeta.height;

  const baselineBuffer = await sharp(baselinePath)
    .resize(width, height, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const actualBuffer = await sharp(actualPath)
    .resize(width, height, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const diffImg = new PNG({ width, height });

  const mismatchedPixels = pixelmatch(
    baselineBuffer,
    actualBuffer,
    diffImg.data,
    width,
    height,
    { threshold, includeAA: false },
  );

  fs.writeFileSync(diffPath, PNG.sync.write(diffImg));

  const totalPixels = width * height;
  const mismatchRatio = mismatchedPixels / totalPixels;

  const expectedBase64 = (
    await sharp(baselinePath)
      .resize(width, height, { fit: "fill" })
      .png()
      .toBuffer()
  ).toString("base64");
  const actualBase64 = (await sharp(actualPath).png().toBuffer()).toString(
    "base64",
  );
  const diffBase64 = (await sharp(diffPath).png().toBuffer()).toString(
    "base64",
  );

  const content = JSON.stringify({
    expected: `data:image/png;base64,${expectedBase64}`,
    actual: `data:image/png;base64,${actualBase64}`,
    diff: `data:image/png;base64,${diffBase64}`,
  });

  await allure.attachment(
    "Screenshot diff details",
    ` Mismatched pixels: ${mismatchedPixels} / ${totalPixels} (${(mismatchRatio * 100).toFixed(2)}%) Max allowed: ${maxDiffPercent * 100}%`,
    "text/plain",
  );
  await allure.attachment(
    "Screenshot diff",
    content,
    "application/vnd.allure.image.diff",
  );

  if (fs.existsSync(path.join(moduleConfig.projectPath, "visualComparison")))
    fs.rmSync(path.join(moduleConfig.projectPath, "visualComparison"), {
      recursive: true,
      force: true,
    });

  if (mismatchRatio > maxDiffPercent) {
    throw new Error(
      `Screenshot mismatch: ${(mismatchRatio * 100).toFixed(2)}% pixels differ (max allowed: ${maxDiffPercent * 100}%)`,
    );
  }
}

module.exports = { screenComparer };
