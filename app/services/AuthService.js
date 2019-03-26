const authProvider = require('auth0');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

module.exports = class AuthService {
  constructor(config) {

    this._tokenProvider = jwt;
    this._tokenRsaProvider = jwks;
    this._authProvider = authProvider;

    this._config = {
      domain: config.domain,
      clientId: config.clientId,
      clientSecret: config.secret,
      jwksUri: config.tokenSecretUri,
      audience: config.audience,
      issuer: config.issuer,
      scope: 'delete:users',
    };

    this._validateTokenObject = {
      secret: this._tokenRsaProvider.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: this._config.jwksUri,
      }),
      aud: this._config.audience,
      iss: this._config.issuer,
      algorithms: ['RS256'],
    };

    this._management = new authProvider.ManagementClient(this._config);
  }

  deleteUserById(userId) {
    if (!userId) {
      throw new ReferenceError('remote id is not provided');
    }
    return this._management.deleteUser({ id: userId });
  }

  validateToken() {
    return this._tokenProvider(this._validateTokenObject);
  }
};
