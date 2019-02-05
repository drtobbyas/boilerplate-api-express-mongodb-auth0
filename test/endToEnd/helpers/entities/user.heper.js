const { UserService } = require('../../../../app/services');
const faker = require('faker');

module.exports = {
  createOne() {
    const newUserData = getNewUserData();
    return UserService.createOne(newUserData);
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
