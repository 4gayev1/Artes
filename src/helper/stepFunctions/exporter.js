const { assert } = require("./assertions");
const { mouse } = require("./mouseActions");
const { keyboard } = require("./keyboardActions");
const { frame } = require("./frameActions");
const { elementInteractions } = require("./elementInteractions");
const { page } = require("./pageActions");
const { api } = require("./APIActions");
const { browser } = require("./browserActions");

module.exports = {
  assert,
  mouse,
  keyboard,
  frame,
  elementInteractions,
  page,
  api,
  browser,
};
