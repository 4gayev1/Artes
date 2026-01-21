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
const page = context.page;
const request = context.request;

const random = faker;
const time = dayjs;

const path = require("path");
const modulePath = process.cwd();
const projectPath = modulePath.split(/[/\\]/).slice(0, -2).join("/");

const moduleConfig = {
  projectPath: projectPath,
  modulePackageJsonPath: path.join(modulePath, "/package.json"),
  modulePath: path.join(modulePath, "/node_modules/artes"),
  reportPath: path.join(modulePath, "/report"),
  tracerPath: path.join(projectPath, "/trace.zip"),
  cucumberConfigPath: path.join(projectPath, "/artes.config.js"),
  featuresPath: path.join(projectPath, "/tests/features/"),
  stepsPath: path.join(projectPath, "/tests/steps/*.js"),
  pomPath: path.join(projectPath, "/tests/POMs"),
  cleanUpPaths:
    "allure-result allure-results test-results testsStatus EXIT_CODE.txt",
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
  page,
  request,
  context,
  moduleConfig,
};
