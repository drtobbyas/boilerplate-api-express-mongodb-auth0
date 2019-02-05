const express = require('express');
const appRoute = express.Router({ strict: true });

const validator = require(`${basePath}/app/middlewares/dataValidators/entities/subscriber/main`);
const controller = require(`${basePath}/app/controllers/subscriber.controller/subscriber.main.controller`);

appRoute.post('/',
  validator.create,
  controller.create,
);

module.exports = appRoute;
