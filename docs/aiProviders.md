# 🤖 AI Providers

Artes supports multiple AI providers for generating bug reports and test summaries.  
Configure the provider via `--aiModel` flag or the `ai.model` field in artes config file.
Use the given exact model name in cli and config file(Just copy and paste the model name).

---

## Supported Providers

### 🔵 Google Gemini

**Flag keyword:** `gemini`  
**Get API key:** https://aistudio.google.com/app/apikey

| Model Name         | `--aiModel` value       |
|--------------------|-------------------------|
| Gemini 2.5 Flash ⭐ | `"gemini 2.5 flash"`    |
| Gemini 2.5 Flash Lite | `"gemini 2.5 flash lite"` |
| Gemini 2.5 Pro     | `"gemini 2.5 pro"`      |
| Gemini 2.0 Flash   | `"gemini 2.0 flash"`    |

```bash
artes --ai --aiModel "gemini 2.5 flash" --aiKey "your-key"
```

---

### 🟢 OpenAI

**Flag keyword:** `openai`, `chatgpt`, `gpt`  
**Get API key:** https://platform.openai.com/api-keys

| Model Name      | `--aiModel` value   |
|-----------------|---------------------|
| GPT-4o ⭐        | `"gpt-4o"`          |
| GPT-4o Mini     | `"gpt-4o mini"`     |
| GPT-4 Turbo     | `"gpt-4 turbo"`     |
| GPT-4           | `"gpt-4"`           |
| GPT-3.5 Turbo   | `"gpt-3.5 turbo"`   |
| o1 Mini         | `"o1 mini"`         |
| o1              | `"o1"`              |

```bash
artes --ai --aiModel "gpt-4o" --aiKey "your-key"
```

---

### 🟠 Anthropic Claude

**Flag keyword:** `claude`, `anthropic`  
**Get API key:** https://console.anthropic.com/settings/keys

| Model Name       | `--aiModel` value    |
|------------------|----------------------|
| Claude Sonnet ⭐  | `"claude sonnet"`    |
| Claude Sonnet 4  | `"claude sonnet 4"`  |
| Claude Opus      | `"claude opus"`      |
| Claude Opus 4    | `"claude opus 4"`    |
| Claude Haiku     | `"claude haiku"`     |

```bash
artes --ai --aiModel "claude sonnet" --aiKey "your-key"
```

---

### 🔴 Mistral

**Flag keyword:** `mistral`  
**Get API key:** https://console.mistral.ai/api-keys

| Model Name      | `--aiModel` value     |
|-----------------|-----------------------|
| Mistral Large ⭐ | `"mistral large"`     |
| Mistral Medium  | `"mistral medium"`    |
| Mistral Small   | `"mistral small"`     |
| Mistral Nemo    | `"mistral nemo"`      |
| Mistral 7B      | `"mistral 7b"`        |

```bash
artes --ai --aiModel "mistral large" --aiKey "your-key"
```

---

### ⚡ Groq

**Flag keyword:** `groq`  
**Get API key:** https://console.groq.com/keys

| Model Name        | `--aiModel` value       |
|-------------------|-------------------------|
| LLaMA 3 70B ⭐    | `"groq llama 3 70b"`    |
| LLaMA 3 8B        | `"groq llama 3 8b"`     |
| Mixtral 8x7B      | `"groq mixtral"`        |
| Gemma 7B          | `"groq gemma 7b"`       |

```bash
artes --ai --aiModel "groq llama 3 70b" --aiKey "your-key"
```

---

### 🔷 Cohere

**Flag keyword:** `cohere`, `command`  
**Get API key:** https://dashboard.cohere.com/api-keys

| Model Name      | `--aiModel` value    |
|-----------------|----------------------|
| Command R+ ⭐   | `"cohere r+"`        |
| Command R       | `"cohere r"`         |

```bash
artes --ai --aiModel "cohere r+" --aiKey "your-key"
```

---

### 🐋 DeepSeek

**Flag keyword:** `deepseek`  
**Get API key:** https://platform.deepseek.com/api_keys

| Model Name       | `--aiModel` value       |
|------------------|-------------------------|
| DeepSeek Chat ⭐  | `"deepseek chat"`       |
| DeepSeek Coder   | `"deepseek coder"`      |

```bash
artes --ai --aiModel "deepseek chat" --aiKey "your-key"
```

---

### 🏠 Local AI (Ollama, LM Studio, etc.)

Run any local model without an API key using `--aiURL` instead of `--aiModel` and `--aiKey`.  
The endpoint must be OpenAI-compatible (accepts `messages` array in the request body).

```bash
# Ollama
artes --ai --aiURL "http://localhost:11434/api/chat"

# LM Studio
artes --ai --aiURL "http://localhost:1234/v1/chat/completions"
```

---

## Config File Usage

Instead of CLI flags, you can set AI options in your `artes.config.js`:

```js
module.exports = {
  ai: {
    ai        : true,
    model     : "gemini 2.5 flash",
    key       : "your-api-key",
    language  : "English",
    maxReports: 10,

    // For local AI — overrides model and key when set:
    // url: "http://localhost:11434/api/chat",
  },
};
```

---

## Environment Variables

All AI options can also be set via environment variables:

| Variable        | Description                              |
|-----------------|------------------------------------------|
| `AI`            | Enable AI reports (`true` / `false`)     |
| `AI_MODEL`      | Model string (e.g. `"gemini 2.5 flash"`) |
| `AI_KEY`        | API key for the provider                 |
| `AI_URL`        | Local AI endpoint URL                    |
| `AI_LANGUAGE`   | Report language (e.g. `"Azerbaijani"`)   |
| `MAX_REPORTS`   | Max reports per run (e.g. `10`)          |

```bash
AI=true AI_MODEL="gpt-4o" AI_KEY="your-key" npx artes
```

---

> ⭐ = default model for that provider