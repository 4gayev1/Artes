const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const CSS_START_MARKER = "/* ARTES_DYNAMIC_START */";
const CSS_END_MARKER = "/* ARTES_DYNAMIC_END */";

function reportCustomizer() {
  delete require.cache[require.resolve("../../../cucumber.config.js")];
  const cucumberConfig = require("../../../cucumber.config.js");

  const report = cucumberConfig.report;
  const today = new Date().toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
  const reportName = typeof report.reportName === "string" ? report.reportName : report.reportName.name || "";

  const { buffer: faviconBuffer, mime: faviconMime } = readFileAsBuffer(defaultLogoPath());
  const faviconDataUrl = `data:${faviconMime};base64,${faviconBuffer.toString("base64")}`;

  if (isRemoteUrl(report.logo)) {
    return fetchRemoteLogo(report.logo)
      .catch((err) => {
        console.warn(`[artes] Warning: failed to fetch logo from "${report.logo}": ${err.message}. Falling back to default logo.`);
        return readFileAsBuffer(defaultLogoPath());
      })
      .then(({ buffer, mime, filename }) => {
        applyLogo(cucumberConfig, report, today, reportName, buffer, mime, filename, faviconDataUrl);
      });
  }

  const logoSrc = resolveLogoPath(report.logo);
  const logoExt = path.extname(logoSrc).replace(".", "").toLowerCase();
  const logoMime = logoExt === "svg" ? "image/svg+xml" : `image/${logoExt}`;
  const logoBuffer = fs.readFileSync(logoSrc);
  applyLogo(cucumberConfig, report, today, reportName, logoBuffer, logoMime, path.basename(logoSrc), faviconDataUrl);
}

function applyLogo(cucumberConfig, report, today, reportName, logoBuffer, logoMime, logoFilename, faviconDataUrl) {
  const logoBase64 = logoBuffer.toString("base64");
  const logoDataUrl = `data:${logoMime};base64,${logoBase64}`;

  if (cucumberConfig.report.singleFileReport) {
    const htmlPath = path.resolve(__dirname, "../../../../../report/index.html");
    const srcCssPath = path.resolve(__dirname, "../../../assets/styles.css");

    const dynamicCss = generateCss(report, today, reportName, logoDataUrl);
    const modifiedCss = injectCssAndReturn(srcCssPath, dynamicCss);
    const cssBase64 = Buffer.from(modifiedCss).toString("base64");
    const cssDataUrl = `data:text/css;base64,${cssBase64}`;


    updateSingleFileHtml(htmlPath, report, reportName, faviconDataUrl, cssDataUrl);

  } else {
    const htmlPath = path.resolve(__dirname, "../../../../../report/index.html");
    const srcCssPath = path.resolve(__dirname, "../../../assets/styles.css");
    const reportDir = path.resolve(__dirname, "../../../../../report");
    const reportCssPath = path.join(reportDir, "styles.css");


    const logoDest = path.join(reportDir, logoFilename);
    fs.writeFileSync(logoDest, logoBuffer);


    const dynamicCss = generateCss(report, today, reportName, logoFilename);

    const modifiedCss = injectCssAndReturn(srcCssPath, dynamicCss);
    fs.writeFileSync(reportCssPath, modifiedCss, "utf8");

    updateHtml(htmlPath, report, reportName, faviconDataUrl);
  }
}

function resolveLogoPath(logoConfig) {
  if (!logoConfig) {
    return defaultLogoPath();
  }

  const resolved = path.isAbsolute(logoConfig)
    ? logoConfig
    : path.resolve(process.cwd(), logoConfig);

  if (!fs.existsSync(resolved)) {
    console.warn(`[artes] Warning: logo not found at "${resolved}". Falling back to default logo.`);
    return defaultLogoPath();
  }

  return resolved;
}

function defaultLogoPath() {
  return path.resolve(process.cwd(), "node_modules", "artes", "assets", "logo.png");
}

function isRemoteUrl(logoConfig) {
  return typeof logoConfig === "string" && (logoConfig.startsWith("http://") || logoConfig.startsWith("https://"));
}

function readFileAsBuffer(filePath) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).replace(".", "").toLowerCase();
  const mime = ext === "svg" ? "image/svg+xml" : `image/${ext}`;
  const filename = path.basename(filePath);
  return { buffer, mime, filename };
}

function fetchRemoteLogo(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error("Too many redirects"));

    const client = url.startsWith("https://") ? https : http;

    client.get(url, (res) => {

      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        return fetchRemoteLogo(res.headers.location, redirectCount + 1).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }

      const contentType = res.headers["content-type"] || "";
      const mime = contentType.split(";")[0].trim();

      if (!mime.startsWith("image/")) {
        res.resume(); 
        return reject(new Error(`URL did not return an image (Content-Type: "${mime || "unknown"}"). Make sure the URL points directly to an image file.`));
      }

      const urlPath = new URL(url).pathname;
      const ext = path.extname(urlPath) || inferExtFromMime(mime);
      const filename = path.basename(urlPath) || `logo${ext}`;

      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve({ buffer: Buffer.concat(chunks), mime, filename }));
      res.on("error", reject);
    }).on("error", reject);
  });
}

function inferExtFromMime(mime) {
  const map = { "image/png": ".png", "image/jpeg": ".jpg", "image/gif": ".gif", "image/svg+xml": ".svg", "image/webp": ".webp" };
  return map[mime] || ".png";
}

function generateCss(report, today, reportName, logoUrl) {
  return `.side-nav{width:200px !important}.side-nav__brand{background:url('${logoUrl}') no-repeat center left !important;background-size:contain !important;height:80px;width:200px;display:flex !important;align-items:center;padding-left:80px}.side-nav__brand img,.side-nav__brand svg{display:none !important}.side-nav__brand-text{font-size:0 !important;display:block !important;padding: 0 8px;}.side-nav__brand-text::after{content:'${report.brandName}';font-size:26px;color:white;}.widget__title{font-weight:lighter;margin-bottom:15px;margin-top:0;text-transform:uppercase}.widget__flex-line:first-child .widget__title{font-size:0}.widget__flex-line:first-child .widget__title::before{content:'${reportName} ${today}';font-size:18px;font-weight:lighter;text-transform:uppercase}.widget__flex-line:first-child .widget__subtitle{font-size:14px}.widget__flex-line:not(:first-child) .widget__title{font-size:inherit;font-weight:lighter}`;
}

function injectCssAndReturn(cssPath, dynamicCss) {
  let css = fs.readFileSync(cssPath, "utf8");

  const startIdx = css.indexOf(CSS_START_MARKER);
  const endIdx = css.indexOf(CSS_END_MARKER);
  if (startIdx !== -1 && endIdx !== -1) {
    css = css.slice(0, startIdx) + css.slice(endIdx + CSS_END_MARKER.length);
  }

  css = css.trimEnd();
  css += `\n${CSS_START_MARKER}\n${dynamicCss}\n${CSS_END_MARKER}\n`;
  return css;
}

function updateSingleFileHtml(htmlPath, report, reportName, faviconDataUrl, cssDataUrl) {
  let html = fs.readFileSync(htmlPath, "utf8");

  html = html.replace(/<title>.*?<\/title>/, `<title>ARTES REPORT</title>`);

  html = html.replace(
    /<link rel="icon" href="data:image\/[^"]+"/,
    `<link rel="icon" href="${faviconDataUrl}"`
  );

  html = html.replace(
    /<link rel="stylesheet" type="text\/css" href="data:text\/css;base64,[^"]+"/,
    `<link rel="stylesheet" type="text/css" href="${cssDataUrl}"`
  );

  fs.writeFileSync(htmlPath, html, "utf8");
}

function updateHtml(htmlPath, report, reportName, faviconDataUrl) {
  let html = fs.readFileSync(htmlPath, "utf8");
  html = html.replace(/<title>.*?<\/title>/, `<title>ARTES REPORT</title>`);

  html = html.replace(/<link rel="icon" href=".*?">/, `<link rel="icon" href="${faviconDataUrl}">`);
  fs.writeFileSync(htmlPath, html, "utf8");
}

module.exports = { reportCustomizer };