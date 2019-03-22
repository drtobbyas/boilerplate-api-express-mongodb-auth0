/**
 * Database Service/Wrapper
 */

const dbServiceProvider = require('mongoose');

module.exports = class DbService {
  constructor(options) {
    this._dbProvider = dbServiceProvider;
    this._dbProvider.Promise = global.Promise;
    this._options = options;
    this.connection = false;

    if (!(this._options && this._options.connectionString)) {
      super.throwError('database connection string is not provided');
    }
  }

  static getDataTypes() {
    return dbServiceProvider.Schema.Types;
  }

  static getSchemaTypes() {
    return dbServiceProvider.Schema.Types;
  }

  static createSchema(schemaData, options) {
    return new dbServiceProvider.Schema(schemaData, options);
  }

  static createModel(modelName, schema) {
    dbServiceProvider.Promise = global.Promise;
    return dbServiceProvider.model(modelName, schema);
  }


  static models(modelName) {
    if (modelName) {
      return dbServiceProvider.models[modelName];
    }
    return dbServiceProvider.models;
  }

  static dropDatabase() {
    return dbServiceProvider.connection.dropDatabase();
  }

  connect() {
    return this._dbProvider.connect(this._options.connectionString, { useNewUrlParser: true });
  }
};
