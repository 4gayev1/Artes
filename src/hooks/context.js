class Context {
  constructor() {
    this.browser = undefined;
    this.page = undefined;
    this.request = undefined;
  }
}

const context = new Context();

module.exports = {
  context,
};
