module.exports = class ServiceContainer {

  constructor() {
    this._container = {};
  }

  register(servicesArray) {
    servicesArray.forEach((singleItem) => {
      this._container[singleItem.name] = singleItem.provider;
    });
  }

  load(services) {
    if (Array.isArray(services)) {
      const output = {};
      services.forEach((singleItem) => {
        if (this._container[singleItem]) {
          output[singleItem] = this._container[singleItem];
        }

      });
      return output;
    }

    if (typeof services === 'string') {
      if (this._container[services]) {
        return this._container[services];
      }
    }

    return { [services]: {} };
  }
};
