const faker = require('faker');
const serviceContainerManager = require('../../../../app/utils/serviceContainerManager');
const { userService } = serviceContainerManager.load(['userService']);

module.exports = {
  createOne() {
    const newUserData = getNewUserData();
    return userService.createOne(newUserData);
  },
};


const getNewUserData = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    remoteId: faker.random.uuid(),
    bio: faker.random.words(),
  };
};
