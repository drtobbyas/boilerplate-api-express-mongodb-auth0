const express = require('express');

const appRoute = express.Router({ strict: true, mergeParams: true });

const controller = require(`${basePath}/app/controllers/user.controllers/user.main.controller`);
const acl = require(`${basePath}/app/middlewares/accessControl/entities/user/main`);
const authMiddleware = require(`${basePath}/app/middlewares/accessControl/entities/auth/main`);
const loader = require(`${basePath}/app/middlewares/entityLoaders/entities/user/main`);
const validator = require('../../../app/middlewares/dataValidators/entities/user/main');


appRoute.post('/sync',
  authMiddleware.validateToken,
  controller.syncOne,
);

// appRoute.get('/',
//   authMiddleware.validateToken,
//   authMiddleware.loadUser,
//   validator.getAll,
//   acl.getAll,
//   loader.getAll,
//   controller.getAll,
// );


appRoute.get('/me',
  authMiddleware.validateToken,
  authMiddleware.loadUser,
  controller.getMe,
);

appRoute.get('/:userId',
  validator.getOne,
  loader.getOne,
  controller.getOne,
);


appRoute.put('/:userId',
  authMiddleware.validateToken,
  authMiddleware.loadUser,
  acl.updateOne,
  validator.updateOne,
  controller.updateOne,
);


appRoute.delete('/me',
  authMiddleware.validateToken,
  authMiddleware.loadUser,
  controller.deleteOne,
);


module.exports = appRoute;
