const express = require('express');
const appRoute = express.Router({ strict: true });


/**
 * Core Routes
 */
appRoute.use('/core', require('./core.route'));

/**
 * Subscriber Routes
 */
appRoute.use('/subscribers', require('./subscriber.routes/subscriber.main.route'));

/**
 * User Routes
 */
appRoute.use('/users', require('./user.routes/user.main.routes'));


module.exports = appRoute;
