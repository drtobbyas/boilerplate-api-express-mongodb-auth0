const express = require('express');
const appRoute = express.Router({ strict: true });

const mainValidator = require('../../app/middlewares/dataValidators/main');

/**
 * Pagination values setter (default)
 * Each GET requests will be mutated with req.query = { skip, limit } values
 * They will be validated and mapped 
 */
appRoute.get('*', mainValidator.validatePagination);
appRoute.use('/v1', require('./index.routes'));

module.exports = appRoute;
