class Context {
  constructor() {
    this.browser = undefined;
    this.page = undefined;
    this.request = undefined;
    this.response = undefined;
    this.vars = {};
  }
}

const context = new Context();

module.exports = {
  context,
};
