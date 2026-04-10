class Context {
  constructor() {
    this.browser = undefined;
    this.page = undefined;
    this.request = undefined;
    this.response = undefined;
    this.pickle = undefined;
    this.step = undefined;
    this.pickleResult = undefined;
    this.vars = undefined;
  }
}

const context = new Context();

module.exports = {
  context,
};
