const { AuthService } = require(`${basePath}/app/services`);


module.exports = {

  async isTokenValid(req, res, next) {

    try {
      await AuthService.verifyRefreshToken(req);
      return next();
    } catch (err) {
      return next(err);
    }
  },

};
