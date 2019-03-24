const authProvider = require('auth0');

module.exports = class AuthService {
  constructor(config) {
    this._config = {
      domain: config.domain,
      clientId: config.clientId,
      clientSecret: config.secret,
      scope: 'delete:users',
    };

    this._authProvider = authProvider;
    this._management = new authProvider.ManagementClient(this._config);
  }

  deleteUserById(userId) {
    if (!userId) {
      throw new ReferenceError('remote id is not provided');
    }
    return this._management.deleteUser({ id: userId });
  }
};
