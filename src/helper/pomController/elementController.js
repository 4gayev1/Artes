const { context } = require("../../hooks/context");

let elements = {};

function addElements(newElements) {
  elements = { ...elements, ...newElements };
}

// async function locatorExistenceChecker(locator){
//   const locatorCount = await locator.count();
//   console.log(locator, locatorCount)
//   return locatorCount ==0 ? false : true;
// }

function selectorSeperator(element) {
  const selector = element?.split("=");
  return [
    selector[0]?.trim(),
    selector[1] !== undefined ? selector[1].trim() : "",
  ];
}

function getSelector(element) {
  const selector =
    elements?.[element]?.selector || elements?.[element] || element;
  return resolveVariable(selectorSeperator(selector));
}

function getElement(element) {
  if (!context.page) {
    throw new Error("Page context is not initialized.");
  }

  const selector = getSelector(element);
  const waitTime = elements[element]?.waitTime * 1000 || 0;

  let locator;
  switch (selector[0]) {
    case "xpath":
      locator = context.page.locator(`xpath=${selector[1]}`, { exact: true });
      break;
    case "name":
      locator = context.page.locator(`[name=${selector[1]}]`, {
        exact: true,
      });
      break;
    case "placeholder":
      locator = context.page.getByPlaceholder(selector[1], { exact: true });
      break;
    case "text":
      locator = context.page.getByText(selector[1], { exact: true });
      break;
    case "label":
      locator = context.page.getByLabel(selector[1], { exact: true });
      break;
    case "role":
      locator = context.page.getByRole(selector[1], { exact: true });
      break;
    case "alt":
      locator = context.page.getByAltText(selector[1], { exact: true });
      break;
    case "title":
      locator = context.page.getByTitle(selector[1], { exact: true });
      break;
    case "testid":
      locator = context.page.getByTestId(selector[1], { exact: true });
      break;
    default:
      locator = context.page.locator(selector[0], { exact: true });
      break;
  }

  return locator;
}

function extractVarsFromResponse(responseBody, vars, customVarName) {
  function getValueByPath(obj, path) {
    const keys = path.split(".");
    let current = obj;

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return undefined;
      }
    }

    return current;
  }

  vars.split(",").forEach((v) => {
    const path = v.trim();
    const value = getValueByPath(responseBody, path);
    if (value !== undefined) {
      saveVar(value, customVarName, path);
    }
  });
}

function saveVar(value, customName, path) {
  if (!customName) {
    const flatKey = path
      .split(".")
      .map((part, i) =>
        i === 0 ? part : part[0].toUpperCase() + part.slice(1),
      )
      .join("");

    context.vars[flatKey] = value;
  } else {
    context.vars[customName] = value;
  }
}

function resolveVariable(template) {
  if (typeof template !== "string") return template;
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, varName) => {
    let value = context.vars[varName];
    if (typeof value === "string") {
      value = value
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t");
    }
    return value !== undefined ? value : `{{${varName}}}`;
  });
}

module.exports = {
  getElement,
  addElements,
  getSelector,
  extractVarsFromResponse,
  saveVar,
  resolveVariable,
};
