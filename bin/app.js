const path = require('path');
global.basePath = path.normalize(`${__dirname}/..`);

/**
 * Initialize Models
 */
require(`${basePath}/app/models/`);


/**
 * Require Needed Services
 */
const { DbService, ResponseService } = require(`${basePath}/app/services`);
const appConfig = require(`${basePath}/config/app`);

/**
 * Create initial service instances
 */
const dbService = new DbService({ connectionString: appConfig.db.connectionString });

/**
 * Require platform services and modules
 */
const App = require('express');
const app = new App();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { NotFound } = require(`${basePath}/app/utils/apiErrors`);
const cors = require('cors');

/**
 * Starts app server
 */
app.listen(appConfig.env.port, () => {
  console.log(`Hell yeah on port '${appConfig.env.port}' under '${appConfig.env.name}' environment`);
});


/**
 * Established DB Connection
 */
try {
  dbService.connect();
} catch (err) {
  console.log(err);
  throw err;
}

/**
 * Sets App Middlewares
 */
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(helmet())
  .use(cors({}))
  .use('/', require(`${basePath}/routes/`))
  .use(routeNotFoundHandler)
  .use(mainErrorHandler);

/**
 * Server Handlers
 */
/**
 * Route Not Found Error Handler
 */
function routeNotFoundHandler(req, res, next) {
  ResponseService.sendErrorResponse(res, new NotFound('route not found'));
}

/**
 * Catches all the errors and sends response
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function mainErrorHandler(err, req, res, next) {
  let error = {};

  if (err && err.status && err.message) {
    error = err;
  } else if ((req.app.get('env') === 'production')) {
    error.message = 'Ooops, something went wrong';
  } else {
    error.message = err.stack || err;
  }
  ResponseService.sendErrorResponse(res, error);
}

module.exports = app;
