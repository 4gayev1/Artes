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

function selectorSeparator(element) {
  if (typeof element !== "string") return element;

  const selector = element?.split("=");
  const validTypes = [
    "xpath",
    "name",
    "placeholder",
    "text",
    "label",
    "role",
    "alt",
    "title",
    "testid",
  ];

  if (selector && validTypes.includes(selector[0]?.trim())) {
    return [
      selector[0].trim(),
      selector[1] !== undefined ? selector[1].trim() : "",
    ];
  } else {
    return selector.join("=");
  }
}

 function getSelector(element) {

  element = resolveVariable(element)

  const selector =
    elements?.[element]?.selector || elements?.[element] || element;
  return resolveVariable(selectorSeparator(selector));
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
      locator = context.page.locator(`[name="${selector[1]}"]`, {
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
      locator = context.page.locator(selector, { exact: true });
      break;
  }

  return locator;
}

function extractVarsFromResponse(responseBody, vars, customVarNames) {

  function getValueByPath(obj, path) {
    const keys = path.split(".");
    let current = obj;

    if (typeof obj === "string") return obj;

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return undefined;
      }
    }

    return current;
  }


  const varPaths = vars.split(",").map(v => v.trim());
  let customNames = [];

  if (typeof customVarNames === "string") {
    customNames = customVarNames.split(",").map(n => n.trim());
  } else if (Array.isArray(customVarNames)) {
    customNames = customVarNames;
  } else {
    throw new Error("customVarNames must be a string or an array");
  }


  if (customNames.length !== varPaths.length) {
    customNames = varPaths;
  }


  varPaths.forEach((path, index) => {
    const value = getValueByPath(responseBody, path);
    if (value !== undefined) {
      saveVar(value, customNames[index], path);
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

function extractVarsFromResponse(responseBody, vars, customVarName) {
  function getValueByPath(obj, path) {
    const keys = path.split(".");
    let current = obj;

    if (typeof obj == "string") return obj;

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return undefined;
      }
    }

    return current;
  }

  const varList = vars.split(",").map((v) => v.trim());
  const customVarNames = customVarName
    ? customVarName.split(",").map((n) => n.trim())
    : [];

  varList.forEach((path, index) => {
    const value = getValueByPath(responseBody, path);
    if (value !== undefined) {
      let resolvedName;
      if (customVarNames.length === 0) {
        resolvedName = undefined;          
      } else if (customVarNames.length === 1) {
        resolvedName = customVarNames[0]; 
      } else {
        resolvedName = customVarNames[index] ?? path; 
      }
      saveVar(value, resolvedName, path);
    }
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
