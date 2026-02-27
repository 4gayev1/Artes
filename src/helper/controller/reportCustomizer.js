const fs = require("fs");
const path = require("path");

const CSS_START_MARKER = "/* ARTES_DYNAMIC_START */";
const CSS_END_MARKER = "/* ARTES_DYNAMIC_END */";

function reportCustomizer() {
  delete require.cache[require.resolve("../../../cucumber.config.js")];
  const cucumberConfig = require("../../../cucumber.config.js");

  const report = cucumberConfig.report;
  const today = new Date().toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
  const reportName = typeof report.reportName === "string" ? report.reportName : report.reportName.name || "";

  const logoSrc = path.resolve(process.cwd(), "node_modules", "artes", "assets", path.basename(report.logo));
  const logoBase64 = fs.readFileSync(logoSrc).toString("base64");
  const logoExt = path.extname(report.logo).replace(".", "");
  const logoMime = logoExt === "svg" ? "image/svg+xml" : `image/${logoExt}`;
  const logoDataUrl = `data:${logoMime};base64,${logoBase64}`;

  if (cucumberConfig.report.singleFileReport) {
    const htmlPath = path.resolve(__dirname, "../../../../../report/index.html");
    const srcCssPath = path.resolve(__dirname, "../../../assets/styles.css");

    const dynamicCss = generateCss(report, today, reportName, logoDataUrl);
    const modifiedCss = injectCssAndReturn(srcCssPath, dynamicCss);
    const cssBase64 = Buffer.from(modifiedCss).toString("base64");
    const cssDataUrl = `data:text/css;base64,${cssBase64}`;

    updateSingleFileHtml(htmlPath, report, reportName, logoDataUrl, cssDataUrl);

  } else {
    const htmlPath = path.resolve(__dirname, "../../../../../report/index.html");
    const srcCssPath = path.resolve(__dirname, "../../../assets/styles.css");
    const reportDir = path.resolve(__dirname, "../../../../../report");
    const reportCssPath = path.join(reportDir, "styles.css");

    const logoDest = path.join(reportDir, "logo.png");
    fs.copyFileSync(logoSrc, logoDest);

    const dynamicCss = generateCss(report, today, reportName, path.basename(report.logo));
    injectCss(srcCssPath, dynamicCss);
    fs.copyFileSync(srcCssPath, reportCssPath);

    updateHtml(htmlPath, report, reportName, logoDataUrl);
}
}

function generateCss(report, today, reportName, logoUrl) {
  return `.side-nav__brand{background:url('${logoUrl}') no-repeat center left !important;background-size:70px 70px !important;height:80px;width:200px;display:flex !important;align-items:center;padding-left:65px}.side-nav__brand img,.side-nav__brand svg{display:none !important}.side-nav__brand-text{font-size:0 !important;display:block !important;padding: 0 8px;}.side-nav__brand-text::after{content:'${report.brandName}';font-size:26px;color:white;}.widget__title{font-weight:lighter;margin-bottom:15px;margin-top:0;text-transform:uppercase}.widget__flex-line:first-child .widget__title{font-size:0}.widget__flex-line:first-child .widget__title::before{content:'${reportName} ${today}';font-size:18px;font-weight:lighter;text-transform:uppercase}.widget__flex-line:first-child .widget__subtitle{font-size:14px}.widget__flex-line:not(:first-child) .widget__title{font-size:inherit;font-weight:lighter}`;
}

function injectCssAndReturn(cssPath, dynamicCss) {
  let css = fs.readFileSync(cssPath, "utf8");

  const startIdx = css.indexOf(CSS_START_MARKER);
  const endIdx = css.indexOf(CSS_END_MARKER);
  if (startIdx !== -1 && endIdx !== -1) {
    css = css.slice(0, startIdx) + css.slice(endIdx + CSS_END_MARKER.length);
  }

  css += `\n${CSS_START_MARKER}\n${dynamicCss}\n${CSS_END_MARKER}`;
  return css;
}

function injectCss(cssPath, dynamicCss) {
  const css = injectCssAndReturn(cssPath, dynamicCss);
  fs.writeFileSync(cssPath, css, "utf8");
}

function updateSingleFileHtml(htmlPath, report, reportName, logoDataUrl, cssDataUrl) {
  let html = fs.readFileSync(htmlPath, "utf8");

  html = html.replace(/<title>.*?<\/title>/, `<title>ARTES REPORT</title>`);

  html = html.replace(
    /<link rel="icon" href="data:image\/[^"]+"/,
    `<link rel="icon" href="${logoDataUrl}"`
  );

  html = html.replace(
    /<link rel="stylesheet" type="text\/css" href="data:text\/css;base64,[^"]+"/,
    `<link rel="stylesheet" type="text/css" href="${cssDataUrl}"`
  );

  fs.writeFileSync(htmlPath, html, "utf8");
}

function updateHtml(htmlPath, report, reportName, logoDataUrl) {
    let html = fs.readFileSync(htmlPath, "utf8");
    html = html.replace(/<title>.*?<\/title>/, `<title>ARTES REPORT</title>`);
    html = html.replace(/<link rel="icon" href=".*?">/, `<link rel="icon" href="${logoDataUrl}">`);
    fs.writeFileSync(htmlPath, html, "utf8");
  }

module.exports = { reportCustomizer };

