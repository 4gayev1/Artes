const { assert } = require("./assertions");
const { mouse } = require("./mouseActions");
const { keyboard } = require("./keyboardActions");
const { frame } = require("./frameActions");
const { elementInteractions } = require("./elementInteractions");
const { page } = require("./pageActions");

module.exports = {
  assert,
  mouse,
  keyboard,
  frame,
  elementInteractions,
  page,
};
