const { expect } = require("playwright/test");
const { Given, When, Then } = require("@cucumber/cucumber");
const {
  getElement,
  getSelector,
  extractVarsFromResponse,
  saveVar,
  resolveVariable,
} = require("../controller/elementController");
const { context } = require("../../hooks/context");

const { faker } = require("@faker-js/faker");
const dayjs = require("dayjs");

const element = getElement;
const selector = getSelector;
const browserPage = context.page;
const request = context.request;

const random = faker;
const time = dayjs;

const path = require("path");
const projectPath = path.resolve(__dirname, "../../../../../");
const modulePath = path.join(projectPath, "node_modules", "artes");

const moduleConfig = {
  projectPath: projectPath,
  modulePackageJsonPath: path.join(modulePath, "package.json"),
  modulePath: modulePath,
  reportPath: path.join(projectPath, "report"),
  tracerPath: path.join(projectPath, "trace.zip"),
  cucumberConfigPath: path.join(projectPath, "artes.config.js"),
  featuresPath: path.join(projectPath, "tests", "features"),
  stepsPath: path.join(projectPath, "tests", "steps", "*.js"),
  pomPath: path.join(projectPath, "tests", "POMs"),
  cleanUpPaths: [
    "allure-result",
    "allure-results",
    "test-results",
    "@rerun.txt",
    "test-status",
    "null",
    "pomDuplicateWarnings.json"
  ]
};

module.exports = {
  expect,
  Given,
  When,
  Then,
  element,
  selector,
  extractVarsFromResponse,
  saveVar,
  resolveVariable,
  random,
  time,
  browserPage,
  request,
  context,
  moduleConfig,
};