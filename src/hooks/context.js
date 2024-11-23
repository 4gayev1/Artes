class Context {
  constructor() {
    this.page = undefined;
    this.request = undefined;
  }
}

const context = new Context();

module.exports = {
  context,
};
