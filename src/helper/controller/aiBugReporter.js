

require("allure-cucumberjs");
const allure = require("allure-js-commons");

const { PROVIDERS } = require("./aiProvider");


function resolveProvider(aiFlag = "gemini 2.5 flash") {
  const flag = aiFlag.trim().toLowerCase();

  const provider = PROVIDERS.find((p) =>
    p.keywords.some((kw) => flag.includes(kw))
  );

  if (!provider) {
    console.warn(` Unknown AI provider "${aiFlag}" — falling back to Gemini.`);
    return { provider: PROVIDERS[0], modelId: PROVIDERS[0].models.default };
  }


  const modelKey = Object.keys(provider.models)
    .filter((k) => k !== "default")
    .sort((a, b) => b.length - a.length)   
    .find((k) => flag.includes(k));

  const modelId = modelKey ? provider.models[modelKey] : provider.models.default;

  return { provider, modelId };
}


async function callAI({ prompt, aiFlag, apiKey, maxTokens }) {
  const { provider, modelId } = resolveProvider(aiFlag);
  
  const url  = provider.buildUrl(modelId, apiKey);
  const body = provider.buildBody(prompt, modelId, maxTokens);

  const headers = { "Content-Type": "application/json" };

  if (provider.authStyle === "header") {
    headers[provider.authKey] = provider.authValue(apiKey);
  }

  if (provider.buildExtraHeaders) {
    Object.assign(headers, provider.buildExtraHeaders());
  }

  const res = await fetch(url, {
    method : "POST",
    headers,
    body   : JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${provider.name} API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = provider.parseResp(data);

  if (!text) throw new Error(`${provider.name} returned an empty response`);

  return text.trim();
}


function stripAnsi(str = "") {

  return str.replace(/\x1B\[[0-9;]*m/g, "");
}

const DUMMY_NAMES = new Set([
  "alma", "test", "scenario", "example", "untitled",
  "sample", "demo", "placeholder", "temp", "tmp",
]);

function isMeaningfulName(name = "") {
  return !DUMMY_NAMES.has(name.trim().toLowerCase());
}


function buildResultContext(result = {}) {
  const raw    = stripAnsi(result.message ?? "");
  const exType = result.exception?.type ?? "Error";
  const exMsg  = stripAnsi(result.exception?.message ?? raw);
  const stack  = stripAnsi(result.exception?.stackTrace ?? "");

  const expectedMatch = raw.match(/Expected[:\s]+(.+)/);
  const receivedMatch = raw.match(/Received[:\s]+(.+)/);

  return {
    errorType   : exType,
    errorMessage: exMsg,
    expected    : expectedMatch ? expectedMatch[1].trim() : null,
    received    : receivedMatch ? receivedMatch[1].trim() : null,
    stackTrace  : stack,
    durationMs  : result.duration
      ? (result.duration.seconds * 1000 + result.duration.nanos / 1e6).toFixed(1)
      : null,
  };
}

function buildPickleContext(pickle = {}) {
  const steps      = (pickle.steps ?? []).map((s) => s.text ?? "");
  const failedStep = steps.at(-1) ?? null;

  return {
    scenarioName     : pickle.name ?? "Unnamed scenario",
    featureFile      : pickle.uri  ?? null,
    steps,
    failedStep,
    useMeaningfulName: isMeaningfulName(pickle.name),
  };
}

async function callLocalAI({ prompt, url, apiKey }) {

  const headers = { "Content-Type": "application/json" };
  if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Local AI error ${res.status}: ${err}`);
  }

  const data = await res.json();


  const text =
    data?.choices?.[0]?.message?.content ||
    data?.response ||
    data?.content ||
    data?.text;

  if (!text) throw new Error("Local AI returned an empty response");

  return text.trim();
}


async function generateFailedBugReport({ resultCtx, pickleCtx, response, language, aiFlag, apiKey, url, maxTokens }) {

  const nameInstruction = pickleCtx.useMeaningfulName
    ? `The test case is named "${pickleCtx.scenarioName}" — use this as context for the bug report title.`
    : `The test case name "${pickleCtx.scenarioName}" is a placeholder — do NOT use it; derive the title from the actual failure.`;

  const prompt = `
You are a senior QA engineer writing a professional bug report with formal language and like human written.
Write the entire report in ${language ?? "English"}.
Translate ALL section headings into ${language ?? "English"} — do not leave any heading in English.

${nameInstruction}

━━━ TEST SCENARIO ━━━
Feature file : ${pickleCtx.featureFile ?? "unknown"}
Scenario     : ${pickleCtx.scenarioName}

Steps in this scenario:
${pickleCtx.steps.map((s, i) => `  ${i + 1}. ${s}`).join("\n")}

Failed step  : ${pickleCtx.failedStep ?? "unknown"}

━━━ ASSERTION FAILURE ━━━
Error type   : ${resultCtx.errorType}
Error message: ${resultCtx.errorMessage}
Expected     : ${resultCtx.expected ?? "see error message"}
Received     : ${resultCtx.received ?? "see error message"}
Duration     : ${resultCtx.durationMs ? resultCtx.durationMs + " ms" : "unknown"}

━━━ API RESPONSE ━━━
${JSON.stringify(response ?? {}, null, 2)}

━━━ FAILED REQUEST cURL ━━━
${response["cURL Command"]}

━━━ INSTRUCTIONS ━━━
Write a bug report with these exact sections in this order.
Translate ALL section headings below into ${language ?? "English"} — do not leave any heading in English.
Do NOT add extra sections. Do NOT use markdown — plain text only.

BUG REPORT NAME
(One concise sentence describing the defect — derive from the failure, not the test name if it is a placeholder)

SUMMARY
(2–4 sentences: what the test was doing, what assertion failed, and why this is a problem)

ACTUAL RESULT
(What the API/system actually did — status code, response body key points)

EXPECTED RESULT
(What it should have done according to the test assertion)

STEPS TO REPRODUCE
(Numbered list — use the scenario steps above; make each step actionable and clear)

FAILED REQUEST
(Paste the cURL command exactly as provided above)
`.trim();


if (url) {
    return callLocalAI({ prompt, url, apiKey });
  }

  return callAI({ prompt, aiFlag, apiKey, maxTokens });
}

async function generatePassedSummary({ pickleCtx, response, language, aiFlag, apiKey, url, maxTokens }) {
  const lang = language ?? "English";

  const prompt = [
    `You are a senior QA engineer writing a short test execution summary for your team.`,
    `Write the entire summary in ${lang}.`,
    `Keep it concise. No bullet soup, no corporate filler.`,
    ``,
    `TEST SCENARIO`,
    `Feature file : ${pickleCtx.featureFile ?? "unknown"}`,
    `Scenario     : ${pickleCtx.scenarioName}`,
    ``,
    `Steps executed:`,
    ...pickleCtx.steps.map((s, i) => `  ${i + 1}. ${s}`),
    ``,
    `API RESPONSE`,
    JSON.stringify(response ?? {}, null, 2),
    ``,
    `INSTRUCTIONS`,
    `Write a short passed test summary with these exact sections in this order.`,
    `Do NOT add extra sections. Do NOT use markdown — plain text only.`,
    `Use these exact translated headings — do not change them, do not revert to English.`,
    ``,
    `Test Name`,
    `One sentence: the name or purpose of this test case. Derive it from the steps if the scenario name is generic.`,
    ``,
    `Test Purpose`,
    `1-2 sentences: what behaviour this test case is verifying and why it matters.`,
    ``,
    `Summary`,
    `2-3 sentences: what happened during execution — which endpoint was called, what data was used,`,
    `what the API returned, and that all assertions passed. Be specific about status codes and key response fields.`,
  ].join("\n");

  if (url) {
    return callLocalAI({ prompt, url, apiKey });
  }

  return callAI({ prompt, aiFlag, apiKey, maxTokens });
}




let _reportCount = 0;



const DEFAULT_DELAY_MS = 3000;

async function attachAiBugReport({
  result,
  pickle,
  response,
  language = "English",
  aiModel,
  aiKey,
  url,
  maxReports = 10,
  delayMs = DEFAULT_DELAY_MS,  
  maxTokens
}) {
  try {
    if (!aiKey && !url) {
      console.warn("⚠️  No AI key or local URL provided. Skipping bug report.");
      return;
    }

    if (_reportCount >= maxReports) {
      console.warn(`⚠️  AI bug report cap reached (${maxReports}). Skipping "${pickle.name}".`);
      return;
    }

    if (_reportCount > 0 && delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    const pickleCtx = buildPickleContext(pickle);

    let reportText;
    let attachmentLabel;

    if (result?.status === "PASSED") {
      reportText = await generatePassedSummary({
        pickleCtx,
        response,
        language,
        aiFlag: aiModel,
        apiKey: aiKey,
        url,
        maxTokens
      });
      attachmentLabel = "Test Summary";
    } else {
      const resultCtx = buildResultContext(result);
      reportText = await generateFailedBugReport({
        resultCtx,
        pickleCtx,
        response,
        language,
        aiFlag: aiModel,
        apiKey: aiKey,
        url,
        maxTokens 
      });
      attachmentLabel = "Bug Report";
    }

    if (!reportText) return;

    _reportCount++;

    await allure.attachment(attachmentLabel, reportText, "text/plain");

  } catch (err) {
    console.warn("⚠️ Bug report generation failed:", err.message);
  }
}


function resetReportCount() {
  _reportCount = 0;
}


module.exports = {
  attachAiBugReport,
  buildResultContext,
  buildPickleContext,
  resolveProvider,
  resetReportCount,
};