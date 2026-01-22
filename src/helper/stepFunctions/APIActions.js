const path = require("path");
const fs = require("fs");
const {
  context,
  selector,
  resolveVariable,
  moduleConfig,
} = require("../imports/commons");

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

function curlExtractor(url, method, headers, body, requestDataType) {
  let curlCommand = `curl -X ${method} '${url}'`;

  if (headers && Object.keys(headers).length > 0) {
    for (const [key, value] of Object.entries(headers)) {
      curlCommand += ` \\\n  -H '${key}: ${value}'`;
    }
  }

  if (body && Object.keys(body).length > 0) {
    switch (requestDataType) {
      case "multipart":
        for (const [key, value] of Object.entries(body)) {
          if (typeof value === "object" && value.buffer) {
            curlCommand += ` \\\n  -F '${key}=@${value.name}'`;
          } else {
            curlCommand += ` \\\n  -F '${key}=${value}'`;
          }
        }
        break;

      case "urlencoded":
      case "application/x-www-form-urlencoded":
        const urlEncodedData = new URLSearchParams(body).toString();
        curlCommand += ` \\\n  --data-urlencode '${urlEncodedData}'`;
        break;

      case "form":
        for (const [key, value] of Object.entries(body)) {
          curlCommand += ` \\\n  -F '${key}=${value}'`;
        }
        break;

      default:
        const hasContentType =
          headers &&
          Object.keys(headers).some(
            (key) => key.toLowerCase() === "content-type",
          );

        if (!hasContentType) {
          curlCommand += ` \\\n  -H 'Content-Type: application/json'`;
        }

        curlCommand += ` \\\n  --data-raw '${JSON.stringify(body)}'`;
        break;
    }
  }

  return curlCommand;
}

function processForm(requestBody) {
  let formData = {};
  for (const [key, value] of Object.entries(requestBody)) {
    if (value === null || value === undefined) {
      continue;
    }

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
        continue;
      } else {
        formData[key] = JSON.stringify(value);
        continue;
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
          continue;
        }
      } catch (error) {
        console.log(error);
      }
    }

    formData[key] = value;
  }
  return formData;
}

async function requestMaker(headers, data, requestDataType) {
  let request = {};

  Object.assign(request, { headers: headers });

  switch (requestDataType) {
    case "multipart":
      Object.assign(request, { multipart: data });
      break;
    case "urlencoded":
    case "application/x-www-form-urlencoded":
      const urlEncodedData = new URLSearchParams(data).toString();
      Object.assign(request, { data: urlEncodedData });
      break;
    case "form":
      Object.assign(request, { form: data });
      break;
    default:
      Object.assign(request, { data: data });
  }

  return request;
}

async function responseMaker(request, response, duration, curlCommand) {
  const responseObject = {};

  response &&
    Object.assign(responseObject, {
      "Response Params": `URL: ${response.url()}
     Response Status: ${await response.status()}
     Response Time: ${Math.round(duration)} ms`,
    });

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

  curlCommand && Object.assign(responseObject, { "cURL Command": curlCommand });

  return responseObject;
}

const api = {
  get: async (url, payload) => {
    const URL = await selector(url);

    const resolvedPayload = (await payload) && resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    const req = await requestMaker(payloadJSON?.headers || {});

    const requestStarts = performance.now();

    const res = await context.request.get(URL, req);

    const duration = performance.now() - requestStarts;

    const curlCommand = curlExtractor(
      res.url(),
      "GET",
      payloadJSON?.headers || {},
      null,
      null,
    );

    const response = responseMaker(payloadJSON, res, duration, curlCommand);

    context.response = await response;
  },
  head: async (url) => {
    const URL = await selector(url);

    const requestStarts = performance.now();

    const res = await context.request.head(URL);

    const duration = performance.now() - requestStarts;

    const curlCommand = curlExtractor(res.url(), "HEAD", {}, null, null);

    const response = responseMaker(null, res, duration, curlCommand);

    context.response = await response;
  },
  post: async (url, payload, requestDataType) => {
    const URL = await selector(url);

    const resolvedPayload = (await payload) && resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    let req;
    let bodyForCurl = payloadJSON?.body || {};

    switch (requestDataType) {
      case "multipart":
        const formRequest = processForm(payloadJSON?.body || {});

        req = await requestMaker(
          payloadJSON?.headers || {},
          formRequest || {},
          requestDataType,
        );
        bodyForCurl = formRequest;
        break;
      case "urlencoded":
      case "application/x-www-form-urlencoded":
        req = await requestMaker(
          {
            ...payloadJSON?.headers,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          payloadJSON?.body || {},
          requestDataType,
        );
        break;
      case "form":
        req = await requestMaker(
          payloadJSON?.headers || {},
          payloadJSON?.body || {},
          requestDataType,
        );
        break;
      default:
        req = await requestMaker(
          payloadJSON?.headers || {},
          payloadJSON?.body || {},
        );
    }

    const requestStarts = performance.now();

    const res = await context.request.post(URL, req);

    const duration = performance.now() - requestStarts;

    const curlCommand = curlExtractor(
      res.url(),
      "POST",
      req.headers,
      bodyForCurl,
      requestDataType,
    );

    const response = await responseMaker(
      payloadJSON,
      res,
      duration,
      curlCommand,
    );

    context.response = response;
  },
  put: async (url, payload, requestDataType) => {
    const URL = await selector(url);

    const resolvedPayload = (await payload) && resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    let req;
    let bodyForCurl = payloadJSON?.body || {};

    switch (requestDataType) {
      case "multipart":
        const formRequest = processForm(payloadJSON?.body || {});

        req = await requestMaker(
          payloadJSON?.headers || {},
          formRequest || {},
          requestDataType,
        );
        bodyForCurl = formRequest;
        break;
      case "urlencoded":
      case "application/x-www-form-urlencoded":
        req = await requestMaker(
          {
            ...payloadJSON?.headers,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          payloadJSON?.body || {},
          requestDataType,
        );
        break;
      case "form":
        req = await requestMaker(
          payloadJSON?.headers || {},
          payloadJSON?.body || {},
          requestDataType,
        );
        break;
      default:
        req = await requestMaker(
          payloadJSON?.headers || {},
          payloadJSON?.body || {},
        );
    }

    const requestStarts = performance.now();

    const res = await context.request.put(URL, req);

    const duration = performance.now() - requestStarts;

    const curlCommand = curlExtractor(
      res.url(),
      "PUT",
      req.headers,
      bodyForCurl,
      requestDataType,
    );

    const response = await responseMaker(
      payloadJSON,
      res,
      duration,
      curlCommand,
    );

    context.response = response;
  },
  patch: async (url, payload, requestDataType) => {
    const URL = await selector(url);

    const resolvedPayload = (await payload) && resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    let req;
    let bodyForCurl = payloadJSON?.body || {};

    switch (requestDataType) {
      case "multipart":
        const formRequest = processForm(payloadJSON?.body || {});

        req = await requestMaker(
          payloadJSON?.headers || {},
          formRequest || {},
          requestDataType,
        );
        bodyForCurl = formRequest;
        break;
      case "urlencoded":
      case "application/x-www-form-urlencoded":
        req = await requestMaker(
          {
            ...payloadJSON?.headers,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          payloadJSON?.body || {},
          requestDataType,
        );
        break;
      case "form":
        req = await requestMaker(
          payloadJSON?.headers || {},
          payloadJSON?.body || {},
          requestDataType,
        );
        break;
      default:
        req = await requestMaker(
          payloadJSON?.headers || {},
          payloadJSON?.body || {},
        );
    }

    const requestStarts = performance.now();

    const res = await context.request.patch(URL, req);

    const duration = performance.now() - requestStarts;

    const curlCommand = curlExtractor(
      res.url(),
      "PATCH",
      req.headers,
      bodyForCurl,
      requestDataType,
    );

    const response = await responseMaker(
      payloadJSON,
      res,
      duration,
      curlCommand,
    );

    context.response = response;
  },
  delete: async (url, payload) => {
    const URL = await selector(url);

    const resolvedPayload = (await payload) && resolveVariable(payload);
    const payloadJSON = (await resolvedPayload) && JSON.parse(resolvedPayload);

    const req = await requestMaker(
      payloadJSON?.headers || {},
      payloadJSON?.body || {},
    );

    const requestStarts = performance.now();

    const res = await context.request.delete(URL, req);

    const duration = performance.now() - requestStarts;

    const curlCommand = curlExtractor(
      res.url(),
      "DELETE",
      payloadJSON?.headers || {},
      payloadJSON?.body || {},
      null,
    );

    const response = responseMaker(payloadJSON, res, duration, curlCommand);

    context.response = await response;
  },
  vars: () => {
    return context.vars;
  },
};

module.exports = { api };
