const { context, selector, resolveVariable } = require("../imports/commons");

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".json": "application/json",
    ".xml": "application/xml",
    ".zip": "application/zip",
    ".doc": "application/msword",
    ".docx":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".csv": "text/csv",
  };

  return mimeTypes[ext] || "application/octet-stream";
}

function processForm(key, value) {
  let formData = {};

  if (typeof value === "object") {
    if (value.contentType) {
      const content =
        typeof value.data === "object"
          ? JSON.stringify(value.data)
          : String(value.data);
      console.log("Content:", content);
      formData[key] = {
        name: value.filename || key,
        mimeType: value.contentType,
        buffer: Buffer.from(content, "utf8"),
      };
    } else {
      formData[key] = JSON.stringify(value);
    }
  }

  if (
    typeof value === "string" &&
    (value.endsWith(".pdf") ||
      value.endsWith(".jpg") ||
      value.endsWith(".png") ||
      value.endsWith(".txt") ||
      value.endsWith(".doc") ||
      value.endsWith(".docx") ||
      value.includes("/"))
  ) {
    // If it looks like a file path, treat it as a file
    try {
      if (fs.existsSync(value)) {
        formData[key] = {
          name: path.basename(value),
          mimeType: getMimeType(value),
          buffer: fs.readFileSync(value),
        };
        return;
      }
    } catch (error) {
      // If file doesn't exist, treat as regular string
    }
  }

  return formData;
}

const api = {
  get: async (url, payload) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    const res = await context.request.get(resolvedURL, {
      headers: payloadJSON ? payloadJSON.headers : {},
    });
    
    try{
      const header = await res.headers();
      const body = await res.json();
  
      const response = {
        url: res.url(),
        response: res,
        responseHeaders: header,
        responseBody: body,
      };
  
      context.response = response;
    }catch(error) {
      throw new Error(`Error processing response: ${error.message}`);
    }
  },
  head: async (url) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const res = await context.request.head(resolvedURL);
    
    try{
      const header = await res.headers();
  
      const response = {
        url: res.url(),
        response: res,
        responseHeaders: header,
        responseBody: body,
      };
  
      context.response = response;
    }catch(error) {
      throw new Error(`Error processing response: ${error.message}`);
    }
  },
  post: async (url, payload, bodyType) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = await resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    let requestBody = {};

    switch (bodyType) {
      case "multipart":
        for (const [key, value] of Object.entries(payloadJSON.body)) {
          var formData = processForm(key, value);
        }
        requestBody = {
          headers: payloadJSON.headers,
          multipart: formData,
        };
        break;
      default:
        requestBody = {
          headers: payloadJSON ? payloadJSON.headers : {},
          data: payloadJSON ? payloadJSON.body : {},
        };
    }

    const res = await context.request.post(resolvedURL, requestBody);

    try{
      const header = await res.headers();
      const body = await res.json();
  
      const response = {
        url: res.url(),
        requestHeaders: payloadJSON.headers,
        requestBody: payloadJSON.body,
        response: res,
        responseHeaders: header,
        responseBody: body,
      };
      context.response = response;
    }catch(error) {
      throw new Error(`Error processing response: ${error.message}`);
    }
   

  },
  put: async (url, payload, bodyType) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = await resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    let requestBody = {};

    switch (bodyType) {
      case "multipart":
        for (const [key, value] of Object.entries(payloadJSON.body)) {
          var formData = processForm(key, value);
        }
        requestBody = {
          headers: payloadJSON.headers,
          multipart: formData,
        };
        break;
      default:
        requestBody = {
          headers: payloadJSON ? payloadJSON.headers : {},
          data: payloadJSON ? payloadJSON.body : {},
        };
    }

    const res = await context.request.put(resolvedURL, requestBody);

    try{
      const header = await res.headers();
      const body = await res.json();
  
      const response = {
        url: res.url(),
        requestHeaders: payloadJSON.headers,
        requestBody: payloadJSON.body,
        response: res,
        responseHeaders: header,
        responseBody: body,
      };
      context.response = response;
    }catch(error) {
      throw new Error(`Error processing response: ${error.message}`);
    }
  },
  patch: async (url, payload, bodyType) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = await resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    let requestBody = {};

    switch (bodyType) {
      case "multipart":
        for (const [key, value] of Object.entries(payloadJSON.body)) {
          var formData = processForm(key, value);
        }
        requestBody = {
          headers: payloadJSON.headers,
          multipart: formData,
        };
        break;
      default:
        requestBody = {
          headers: payloadJSON ? payloadJSON.headers : {},
          data: payloadJSON ? payloadJSON.body : {},
        };
    }

    const res = await context.request.patch(resolvedURL, requestBody);

    try{
      const header = await res.headers();
      const body = await res.json();
  
      const response = {
        url: res.url(),
        requestHeaders: payloadJSON.headers,
        requestBody: payloadJSON.body,
        response: res,
        responseHeaders: header,
        responseBody: body,
      };
      context.response = response;
    }catch(error) {
      throw new Error(`Error processing response: ${error.message}`);
    }
  },
  delete: async (url, payload) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = await resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    const res = await context.request.delete(resolvedURL, {
      headers: payloadJSON.headers,
    });


    try{
      const header = await res.headers();
      const body = await res.json();
  
      const response = {
        url: res.url(),
        response: res,
        responseHeaders: header,
        responseBody: body,
      };
  
      context.response = response;
    }catch(error) {
      throw new Error(`Error processing response: ${error.message}`);
    }

  },
  vars: () => {
    return context.vars;
  },
};

module.exports = { api };
