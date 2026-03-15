
const PROVIDERS = [

  {
    name    : "Gemini",
    keywords: ["gemini"],
    models  : {
      "2.5 flash lite" : "gemini-2.5-flash-lite",   
      "2.5 flash"      : "gemini-2.5-flash",         
      "2.5 pro"        : "gemini-2.5-pro",           
      "2.0 flash"      : "gemini-2.0-flash",         
      default          : "gemini-2.5-flash",         
    },
    authStyle : "queryparam",
    buildUrl  : (modelId, apiKey) =>
      `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`,
    buildBody : (prompt) => ({
      contents        : [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.6, maxOutputTokens: 4000 },
    }),
    parseResp : (data) => data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "",
  },


  {
    name    : "OpenAI",
    keywords: ["openai", "chatgpt", "gpt"],
    models  : {
      "4o mini"   : "gpt-4o-mini",
      "4o"        : "gpt-4o",
      "4 turbo"   : "gpt-4-turbo",
      "4"         : "gpt-4",
      "3.5 turbo" : "gpt-3.5-turbo",
      "o1 mini"   : "o1-mini",
      "o1"        : "o1-preview",
      default     : "gpt-4o",
    },
    authStyle : "header",
    authKey   : "Authorization",
    authValue : (apiKey) => `Bearer ${apiKey}`,
    buildUrl  : () => "https://api.openai.com/v1/chat/completions",
    buildBody : (prompt, modelId) => ({
      model      : modelId,
      max_tokens : 4000,
      temperature: 0.6,
      messages   : [{ role: "user", content: prompt }],
    }),
    parseResp : (data) => data?.choices?.[0]?.message?.content ?? "",
  },


  {
    name    : "Claude",
    keywords: ["claude", "anthropic"],
    models  : {
      "opus 4"   : "claude-opus-4-5",
      "sonnet 4" : "claude-sonnet-4-5",
      "haiku"    : "claude-haiku-4-5-20251001",
      "opus"     : "claude-opus-4-5",
      "sonnet"   : "claude-sonnet-4-5",
      default    : "claude-sonnet-4-5",
    },
    authStyle        : "header",
    authKey          : "x-api-key",
    authValue        : (apiKey) => apiKey,
    buildExtraHeaders: () => ({ "anthropic-version": "2023-06-01" }),
    buildUrl         : () => "https://api.anthropic.com/v1/messages",
    buildBody        : (prompt, modelId) => ({
      model     : modelId,
      max_tokens: 4000,
      messages  : [{ role: "user", content: prompt }],
    }),
    parseResp : (data) =>
      (data?.content ?? []).filter((b) => b.type === "text").map((b) => b.text).join(""),
  },


  {
    name    : "Mistral",
    keywords: ["mistral"],
    models  : {
      "large"  : "mistral-large-latest",
      "medium" : "mistral-medium-latest",
      "small"  : "mistral-small-latest",
      "nemo"   : "open-mistral-nemo",
      "7b"     : "open-mistral-7b",
      default  : "mistral-large-latest",
    },
    authStyle : "header",
    authKey   : "Authorization",
    authValue : (apiKey) => `Bearer ${apiKey}`,
    buildUrl  : () => "https://api.mistral.ai/v1/chat/completions",
    buildBody : (prompt, modelId) => ({
      model      : modelId,
      max_tokens : 4000,
      temperature: 0.6,
      messages   : [{ role: "user", content: prompt }],
    }),
    parseResp : (data) => data?.choices?.[0]?.message?.content ?? "",
  },


  {
    name    : "Groq",
    keywords: ["groq"],
    models  : {
      "llama 3 70b" : "llama3-70b-8192",
      "llama 3 8b"  : "llama3-8b-8192",
      "mixtral"     : "mixtral-8x7b-32768",
      "gemma 7b"    : "gemma-7b-it",
      default       : "llama3-70b-8192",
    },
    authStyle : "header",
    authKey   : "Authorization",
    authValue : (apiKey) => `Bearer ${apiKey}`,
    buildUrl  : () => "https://api.groq.com/openai/v1/chat/completions",
    buildBody : (prompt, modelId) => ({
      model      : modelId,
      max_tokens : 4000,
      temperature: 0.6,
      messages   : [{ role: "user", content: prompt }],
    }),
    parseResp : (data) => data?.choices?.[0]?.message?.content ?? "",
  },


  {
    name    : "Cohere",
    keywords: ["cohere", "command"],
    models  : {
      "r+" : "command-r-plus",
      "r"  : "command-r",
      default: "command-r-plus",
    },
    authStyle : "header",
    authKey   : "Authorization",
    authValue : (apiKey) => `Bearer ${apiKey}`,
    buildUrl  : () => "https://api.cohere.com/v2/chat",
    buildBody : (prompt, modelId) => ({
      model   : modelId,
      messages: [{ role: "user", content: prompt }],
    }),
    parseResp : (data) => data?.message?.content?.[0]?.text ?? "",
  },


  {
    name    : "DeepSeek",
    keywords: ["deepseek"],
    models  : {
      "coder" : "deepseek-coder",
      "chat"  : "deepseek-chat",
      default : "deepseek-chat",
    },
    authStyle : "header",
    authKey   : "Authorization",
    authValue : (apiKey) => `Bearer ${apiKey}`,
    buildUrl  : () => "https://api.deepseek.com/chat/completions",
    buildBody : (prompt, modelId) => ({
      model      : modelId,
      max_tokens : 4000,
      temperature: 0.6,
      messages   : [{ role: "user", content: prompt }],
    }),
    parseResp : (data) => data?.choices?.[0]?.message?.content ?? "",
  },
];

module.exports = { PROVIDERS };