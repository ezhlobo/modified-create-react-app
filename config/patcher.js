class Patcher {
  static isCssLoader(handler) {
    return handler.test && handler.test.toString().indexOf('\\.css') > -1;
  }

  static isJSLoader(handler) {
    return handler.test && handler.test.toString().match(/[^\w]js[^\w]/g) !== null;
  }

  constructor(config) {
    this.config = config;
    return this;
  }

  patch(patch) {
    patch(this.config);

    return this;
  }

  addAliases(aliases) {
    this.config.resolve = Object.assign({}, this.config.resolve, {
      alias: Object.assign({}, this.config.resolve.alias, aliases),
    });

    return this;
  }

  patchLoader(test, patch) {
    this.config.module.loaders.forEach((handler) => {
      if (test(handler)) {
        patch(handler);
      }
    });

    return this;
  }

  patchCssLoader(patch) {
    return this.patchLoader(Patcher.isCssLoader, patch);
  }

  patchJSLoader(patch) {
    return this.patchLoader(Patcher.isJSLoader, patch);
  }
}

module.exports = Patcher;
