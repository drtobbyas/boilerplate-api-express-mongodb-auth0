
const path = require('path');
global.basePath = path.normalize(`${__dirname}/../../..`);
const { UserService, DbService } = require('../../../app/services');

require('dotenv').config({ path: `${__dirname}/../../../config/env/.env` });
require(`${basePath}/app/models/`);

const userData = [
  {
    email: 'name_00@domain.com',
    password: 'password',
    firstName: 'User',
    lastName: '00',
  },
  {
    email: 'name_01@domain.com',
    password: 'password',
    firstName: 'User',
    lastName: '01',
  },
  {
    email: 'name_02@domain.com',
    password: 'password',
    firstName: 'User',
    lastName: '02',
  },
  {
    email: 'name_03@domain.com',
    password: 'password',
    firstName: 'User',
    lastName: '03',
  },
];

const createUserList = (userDataList) => {
  if (!(userDataList && Array.isArray(userDataList))) {
    throw new TypeError();
  }

  const promiseList = [];

  userDataList.forEach((singleItem) => {
    const newUser = new UserService(singleItem);
    promiseList.push(newUser.create());
  });

  return Promise.all(promiseList);
};

const log = (message) => {
  console.log(message);
};

const exitScript = () => {
  process.exit();
};

(async () => {

  try {
    const dbService = new DbService({ connectionString: process.env.DB_CONNECTION_STRING });

    await dbService.connect();
    await createUserList(userData);
  } catch (err) {
    log(err);
  }
  exitScript();
})();
