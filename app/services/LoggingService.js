const LoggerProvider = require('winston');

module.exports = class LoggingService {
  constructor() {
    this._LoggerProvider = LoggerProvider;

    this._logger = this._LoggerProvider.createLogger({
      level: 'info',
      format: this._LoggerProvider.format.timestamp(),
      transports: [
        new this._LoggerProvider.transports.Console({
          format: this._LoggerProvider.format.combine(
            this._LoggerProvider.format.colorize(),
            this._LoggerProvider.format.simple(),
          ),
        }),
      ],
    });
  }

  /* eslint-disable class-methods-use-this */
  _formatLogMessage(message) {
    if (typeof message === 'object') {
      return JSON.stringify(message);
    }
    return message;
  }

  log(message) {
    this._logger.log({ level: 'info', message: this._formatLogMessage(message) });
  }

  logError(error) {
    this._logger.log({ level: 'error', error: this._formatLogMessage(error) });
  }
};
