const path = require("path");
const fs = require("fs");
const { context, selector, resolveVariable, moduleConfig } = require("../imports/commons");

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

function processForm(formData, key, value) {
  if (typeof value === "object") {
    if (value.contentType) {
      const content =
        typeof value.data === "object"
          ? JSON.stringify(value.data)
          : String(value.data);

      formData[key] = {
        name: value.filename || key,
        mimeType: value.contentType,
        buffer: Buffer.from(content, "utf8"),
      };
      return;
    } else {
      formData[key] = JSON.stringify(value);
      return;
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
    try {
      const filePath = path.join(moduleConfig.projectPath, value);
      if (fs.existsSync(filePath)) {
        formData[key] = {
          name: path.basename(filePath),
          mimeType: getMimeType(filePath),
          buffer: fs.readFileSync(filePath),
        };
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  formData[key] = value;
}

async function requestMaker(headers, data, requestDataType) {
  let request = {};

  Object.assign(request, { headers: headers });

  switch (requestDataType) {
    case "multipart":
      Object.assign(request, { multipart: data });
      break;
    default:
      Object.assign(request, { data: data });
  }

  return request;
}

async function responseMaker(request, response) {
  const responseObject = {};

  response && Object.assign(responseObject, { URL: response.url() });

  request?.headers &&
    Object.assign(responseObject, { "Request Headers": await request.headers });

  request?.body &&
    Object.assign(responseObject, { "Request Body": await request.body });

  response && Object.assign(responseObject, { Response: await response });

  response &&
    Object.assign(responseObject, {
      "Response Headers": await response.headers(),
    });

  if (response) {
    try {
      Object.assign(responseObject, { "Response Body": await response.json() });
    } catch (e) {
      Object.assign(responseObject, { "Response Body": await response.text() });
    }
  }

  return responseObject;
}

const api = {
  get: async (url, payload) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = (await payload) && resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    const req = await requestMaker(payloadJSON?.headers || {});

    const res = await context.request.get(resolvedURL, req);

    const response = responseMaker(payloadJSON, res);

    context.response = await response;
  },
  head: async (url) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const res = await context.request.head(resolvedURL);

    const response = responseMaker(payloadJSON, res);

    context.response = await response;
  },
  post: async (url, payload, requestDataType) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = (await payload) && resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    let req;

    switch (requestDataType) {
      case "multipart":
        let formData = {};
        
        for (const [key, value] of Object.entries(payloadJSON?.body)) {
          processForm(formData, key, value);
        }

        req = await requestMaker(
          payloadJSON?.headers || {},
          formData || {},
          requestDataType,
        );
        break;
      default:
        req = await requestMaker(
          payloadJSON?.headers || {},
          payloadJSON?.body || {},
        );
    }

    const res = await context.request.post(resolvedURL, req);

    const response = await responseMaker(payloadJSON, res);

    context.response = response;
  },
  put: async (url, payload, requestDataType) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = (await payload) && resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    let req;

    switch (requestDataType) {
      case "multipart":
        let formData = {};
        
        for (const [key, value] of Object.entries(payloadJSON?.body)) {
          processForm(formData, key, value);
        }

        req = await requestMaker(
          payloadJSON?.headers || {},
          formData || {},
          requestDataType,
        );

        break;
      default:
        req = await requestMaker(
          payloadJSON?.headers || {},
          payloadJSON?.body || {},
        );
    }

    const res = await context.request.put(resolvedURL, req);

    const response = await responseMaker(payloadJSON, res);

    context.response = response;
  },
  patch: async (url, payload, requestDataType) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = (await payload) && resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    let req;

    switch (requestDataType) {
      case "multipart":
        let formData = {};
        
        for (const [key, value] of Object.entries(payloadJSON?.body)) {
          processForm(formData, key, value);
        }

        req = await requestMaker(
          payloadJSON?.headers || {},
          formData || {},
          requestDataType,
        );

        break;
      default:
        req = await requestMaker(
          payloadJSON?.headers || {},
          payloadJSON?.body || {},
        );
    }

    const res = await context.request.patch(resolvedURL, req);

    const response = await responseMaker(payloadJSON, res);

    context.response = response;
  },
  delete: async (url, payload) => {
    const URL = await selector(url);
    const resolvedURL = await resolveVariable(URL);

    const resolvedPayload = (await payload) && resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    const req = await requestMaker(payloadJSON?.headers || {});

    const res = await context.request.delete(resolvedURL, req);

    const response = responseMaker(payloadJSON, res);

    context.response = await response;
  },
  vars: () => {
    return context.vars;
  },
};

module.exports = { api };
