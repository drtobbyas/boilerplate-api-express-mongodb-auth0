const ServiceContainer = require('./ServiceContainer');
const serviceContainer = new ServiceContainer();

module.exports = {
  register(servicesArray) {
    return serviceContainer.register(servicesArray);
  },

  load(services) {
    return serviceContainer.load(services);
  },
};
