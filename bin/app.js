const path = require('path');
global.basePath = path.normalize(`${__dirname}/..`);


/**
 * Initialize Models
 */
require(`${basePath}/app/models/`);

/**
 * Require Needed Services
 */
const serviceContainerManager = require('../app/utils/serviceContainerManager');
const {
  AuthService,
  CryptoService,
  DbService,
  EntityLoaderService,
  FileUploadService,
  LoggingService,
  ResponseService,
  ServerService,
  SubscriberService,
  UserService,
} = require(`${basePath}/app/services`);
const appConfig = require(`${basePath}/config/app`);

/**
 * Create initial service instances
 */

serviceContainerManager.register([
  { name: 'authService', provider: AuthService },
  { name: 'cryptoService', provider: new CryptoService() },
  { name: 'dbService', provider: new DbService(({ connectionString: appConfig.db.connectionString })) },
  { name: 'entityLoaderService', provider: EntityLoaderService },
  { name: 'FileUploadService', provider: FileUploadService },
  { name: 'loggingService', provider: new LoggingService() },
  { name: 'ServerService', provider: ServerService },
  { name: 'subscriberService', provider: new SubscriberService() },
  { name: 'userService', provider: new UserService({ AuthService, cryptoService: new CryptoService() }) },
  { name: 'ResponseService', provider: ResponseService },
]);

/**
 * Require platform services and modules
 */
const App = require('express');
const app = new App();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { NotFound } = require(`${basePath}/app/utils/apiErrors`);
const cors = require('cors');
const { loggingService, dbService } = serviceContainerManager.load(['loggingService', 'dbService']);

/**
 * Starts app server
 */
app.listen(appConfig.env.port, () => {
  loggingService.log(`Hell yeah on port '${appConfig.env.port}' under '${appConfig.env.name}' environment`);
});


/**
 * Established DB Connection
 */
try {
  dbService.connect();
} catch (err) {
  loggingService.logError(err);
  throw err;
}

/**
 * Sets App Middlewares
 */
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use((req, res, next) => {
    loggingService.log({ headers: req.headers, url: req.url, method: req.method, body: req.body });
    next();
  })
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
  const error = new NotFound('route not found');

  loggingService.logError(error);

  ResponseService.sendErrorResponse(res, error);
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
  loggingService.logError(err);
  ResponseService.sendErrorResponse(res, error);
}

module.exports = app;
