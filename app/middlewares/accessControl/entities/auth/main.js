const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const { AuthService, UserService } = require(`${basePath}/app/services`);
const { Forbidden, NotAuthorized } = require(`${basePath}/app/utils/apiErrors`);
const config = require(`${basePath}/config/app`);

const userRoles = UserService.getRoles();


module.exports = {

  /**
   * auth middleware method to authenticate via token
   */

  async isAuthenticated(req, res, next) {

    try {
      await AuthService.verifyAccessToken(req);
      return next();
    } catch (err) {
      return next(err);
    }
  },

  async loadUser(req, res, next) {
    try {
      const loadedUser = await loadUser(req.user.sub);
      setRequestUser(req, loadedUser);
      return next();
    } catch (err) {
      return next(err);
    }
  },

  async validateToken(req, res, next) {
    return jwtCheck(req, res, next);
  },

  async isAdmin(req, res, next) {
    if (req.user && req.user.role === userRoles.ADMIN) {
      return next();
    }
    return next(new Forbidden());
  },
};


const loadUser = async (remoteId) => {
  const userFound = await UserService.findByRemoteId(remoteId);
  if (!(userFound && Object.keys(userFound))) {
    throw new NotAuthorized('');
  }
  return userFound;
};

const setRequestUser = (req, userData) => {
  req.user = Object.assign({}, userData);
  return req.user;
};

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.auth.authProvider.tokenSecretUri,
  }),
  aud: config.auth.authProvider.audience,
  iss: config.auth.authProvider.issuer,
  algorithms: ['RS256'],
});
