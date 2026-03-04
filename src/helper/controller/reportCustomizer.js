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

  const testPercentage = cucumberConfig.default?.testPercentage ?? 0;
  let testCoverageWidgetCss = "";

  if (testPercentage > 0) {
    const { testCoverageCalculator } = require("./testCoverageCalculator");
    const testCoverage = testCoverageCalculator();

    if (testCoverage) {
      const meetsThreshold = testCoverage.percentage >= testPercentage;

      if (meetsThreshold) {
        console.log(`✅ Tests passed required ${testPercentage}% success rate with ${testCoverage.percentage.toFixed(2)}%!`);
        process.env.EXIT_CODE = parseInt(0, 10);
      } else {
        console.log(`❌ Tests failed required ${testPercentage}% success rate with ${testCoverage.percentage.toFixed(2)}%!`);
        process.env.EXIT_CODE = parseInt(1, 10);
      }

      testCoverageWidgetCss = generateTestCoverageWidgetCss(testCoverage, testPercentage, meetsThreshold);
    }
  }

  if (cucumberConfig.report.singleFileReport) {
    const htmlPath = path.resolve(__dirname, "../../../../../report/index.html");
    const srcCssPath = path.resolve(__dirname, "../../../assets/styles.css");

    const dynamicCss = generateCss(report, today, reportName, logoDataUrl) + (testCoverageWidgetCss ? "\n" + testCoverageWidgetCss : "");
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

    const dynamicCss = generateCss(report, today, reportName, logoFilename) + (testCoverageWidgetCss ? "\n" + testCoverageWidgetCss : "");
    const modifiedCss = injectCssAndReturn(srcCssPath, dynamicCss);
    fs.writeFileSync(reportCssPath, modifiedCss, "utf8");

    updateHtml(htmlPath, report, reportName, faviconDataUrl);
  }
}

function generateTestCoverageWidgetCss(testCoverage, testPercentage, meetsThreshold) {
  const fill        = Math.min(testCoverage.percentage, 100);
  const fillPct     = fill.toFixed(4);
  const pctLabel    = testCoverage.percentage.toFixed(2);
  const statusColor = meetsThreshold ? "#4caf50" : "#f44336";
  const statusBg    = meetsThreshold ? "rgba(76,175,80,.13)" : "rgba(244,67,54,.13)";
  const statusVerb  = meetsThreshold ? "passed" : "failed";
  const subtitleTxt = `${testCoverage.passed} / ${testCoverage.totalTests} passed`;
  const statusLine  = `Tests ${statusVerb} \u2014 required ${testPercentage}% with ${pctLabel}%`;


  const r1 = (fill * 0.35).toFixed(2);
  const r2 = (fill * 0.60).toFixed(2);
  const tm = testPercentage;

   const barGradient = `
    linear-gradient(to right,
      transparent calc(${tm}% - 1.5px),
      rgba(255,255,255,.95) calc(${tm}% - 1.5px),
      rgba(255,255,255,.95) calc(${tm}% + 1.5px),
      transparent calc(${tm}% + 1.5px)
    ),
    linear-gradient(to right, #f44336 0%, #ff9800 35%, #ffeb3b 60%, #4caf50 100%)
  `.trim();

   const pointerX = `${fillPct}%`;
  const svgLabels = [
    { val: "0",   x: "0%",   anchor: "start"  },
    { val: "20",  x: "20%",  anchor: "middle" },
    { val: "40",  x: "40%",  anchor: "middle" },
    { val: "60",  x: "60%",  anchor: "middle" },
    { val: "80",  x: "80%",  anchor: "middle" },
    { val: "100", x: "100%", anchor: "end"    },
  ];

  const labelNodes = svgLabels
    .map(l => `<text x="${l.x}" y="10" text-anchor="${l.anchor}" font-family="sans-serif" font-size="10" fill="#bbb">${l.val}</text>`)
    .join("");
const pointerColor = meetsThreshold ? "#4caf50" : "#f44336";
  const px = (fill * 10).toFixed(1); // 0–1000 units mapping to 0–100%

  const labelPointerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="18">
    <text x="${fillPct}%" y="14" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="${pointerColor}">${pctLabel}%</text>
  </svg>`;

  const stemSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 18" preserveAspectRatio="none" width="100%" height="18">
    <line x1="${px}" y1="0" x2="${px}" y2="10" stroke="${pointerColor}" stroke-width="6"/>
    <polygon points="${parseFloat(px)-12},8 ${parseFloat(px)+12},8 ${parseFloat(px)},18" fill="${pointerColor}"/>
  </svg>`;

  const labelPointerB64 = Buffer.from(labelPointerSvg).toString("base64");
  const labelPointerDataUrl = `data:image/svg+xml;base64,${labelPointerB64}`;
  const stemB64 = Buffer.from(stemSvg).toString("base64");
  const stemDataUrl = `data:image/svg+xml;base64,${stemB64}`;

  const pointerDataUrl = stemDataUrl; 
  const pointerLabelDataUrl = labelPointerDataUrl;

  const labelSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="14">${labelNodes}</svg>`;

  const svgB64 = Buffer.from(labelSvg).toString("base64");
  const svgDataUrl = `data:image/svg+xml;base64,${svgB64}`;

  const CARD_H            = 180;
  const TITLE_PAD         = 14;
  const POINTER_FROM_CARD = 62;
  const BAR_FROM_CARD     = 98;
  const LABEL_FROM_CARD   = 116;
  const STATUS_FROM_CARD  = 138;

  return `
/* ── ARTES TEST COVERAGE WIDGET ─────────────────────────────────────────── */

[data-id="summary"] {
  margin-bottom: ${CARD_H + 22}px !important;
  position: relative;
}

/* 1. Card shell + "TEST COVERAGE" title — 21px black */
[data-id="summary"]::after {
  content: 'TEST COVERAGE';
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  height: ${CARD_H}px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0,0,0,.15);
  padding: ${TITLE_PAD}px 16px 0;
  box-sizing: border-box;
  font-size: 21px;
  font-weight: 100;
  color: #000;
  text-transform: uppercase;
  line-height: 1.4;
  pointer-events: none;
  z-index: 1;
}

/* 2. "1 / 1 passed   100.00%" — subtitle + percentage on same line */
[data-id="summary"] .widget__body > div {
  position: relative;
}

[data-id="summary"] .widget__body > div::before {
  content: '${subtitleTxt}     ${pctLabel}%';
  position: absolute;
  top: calc(100% + 10px + 46px);
  left: 0;
  font-size: 14px;
  font-weight: 400;
  color: #999;
  line-height: 1;
  letter-spacing: 0;
  pointer-events: none;
  z-index: 2;
}

/* 3. Pointer — label SVG on top, stem+triangle SVG below, layered via multiple backgrounds */
[data-id="summary"] .widget__body > div > *:first-child {
  position: relative;
}

[data-id="summary"] .widget__body > div > *:first-child::after {
  content: '';
  position: absolute;
  top: calc(100% + 10px + ${POINTER_FROM_CARD}px);
  left: 16px;
  right: 16px;
  height: 36px;
  /* label on top (18px), stem+triangle below (18px) */
  background-image: url("${pointerLabelDataUrl}"), url("${pointerDataUrl}");
  background-repeat: no-repeat, no-repeat;
  background-size: 100% 50%, 100% 50%;
  background-position: top, bottom;
  pointer-events: none;
  z-index: 3;
}

/* 4. SVG label row — perfectly aligned under bar via background-image */
[data-id="summary"] .widget__body > div::after {
  content: '';
  position: absolute;
  top: calc(100% + 10px + ${LABEL_FROM_CARD}px);
  left: 16px;
  right: 16px;
  height: 14px;
  background-image: url("${svgDataUrl}");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  pointer-events: none;
  z-index: 2;
}

/* 5. Gradient bar */
[data-id="summary"] .widget__body {
  position: static;
}

[data-id="summary"] .widget__body::before {
  content: '';
  position: absolute;
  top: calc(100% + 10px + ${BAR_FROM_CARD}px);
  left: 16px;
  right: 16px;
  height: 14px;
  border-radius: 7px;
  background: ${barGradient};
  box-shadow: inset 0 1px 3px rgba(0,0,0,.12);
  pointer-events: none;
  z-index: 2;
}

/* 5. Status pill */
[data-id="summary"] .widget__body::after {
  content: '${statusLine}';
  position: absolute;
  top: calc(100% + 10px + ${STATUS_FROM_CARD}px);
  left: 16px;
  right: 16px;
  font-size: 12px;
  font-weight: 500;
  color: ${statusColor};
  background: ${statusBg};
  padding: 5px 10px;
  border-radius: 3px;
  box-sizing: border-box;
  pointer-events: none;
  z-index: 2;
}

/* ── End ARTES TEST COVERAGE WIDGET ─────────────────────────────────────── */
`;
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