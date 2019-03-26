const { Forbidden, NotAuthorized } = require(`${basePath}/app/utils/apiErrors`);
const serviceContainerManager = require('../../../../utils/serviceContainerManager');
const { userService, authService } = serviceContainerManager.load(['userService', 'authService']);

const userRoles = userService.getRoles();

module.exports = {

  /**
   * auth middleware method to authenticate via token
   */

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
    return authService.validateToken()(req, res, next);
  },

  async isAdmin(req, res, next) {
    if (req.user && req.user.role === userRoles.ADMIN) {
      return next();
    }
    return next(new Forbidden());
  },
};


const loadUser = async (remoteId) => {
  const userFound = await userService.findByRemoteId(remoteId);
  if (!(userFound && Object.keys(userFound))) {
    throw new NotAuthorized('');
  }
  return userFound;
};

const setRequestUser = (req, userData) => {
  req.user = { ...userData };
  return req.user;
};
