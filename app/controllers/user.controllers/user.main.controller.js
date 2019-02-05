const { EntityLoaderService, ResponseService, UserService } = require(`${basePath}/app/services`);

module.exports = {


  async syncOne(req, res, next) {
    try {
      /**
     * Auth0 User Data taken from token
     */
      const remoteUserData = req.user;
      const userSynced = await UserService.syncOne(remoteUserData);

      return ResponseService.sendSuccessResponse(res, userSynced);
    } catch (err) {
      return next(err);
    }
  },

  async updateOne(req, res, next) {
    try {
      const currentUserId = req.user._id;
      const updateData = req.body;

      const updatedUser = await UserService.updateOne(currentUserId, updateData);
      ResponseService.sendSuccessResponse(res, updatedUser);
    } catch (err) {
      return next(err);
    }
  },

  async getOne(req, res, next) {

    try {
      const user = EntityLoaderService.getEntity(req, 'user');
      ResponseService.sendSuccessResponse(res, user);
    } catch (err) {
      return next(err);
    }
  },


  async getMe(req, res, next) {
    try {
      ResponseService.sendSuccessResponse(res, req.user);
    } catch (err) {
      return next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const users = EntityLoaderService.getEntity(req, 'users');
      ResponseService.sendSuccessResponse(res, users);
    } catch (err) {
      return next(err);
    }
  },

  async deleteOne(req, res, next) {
    try {
      const currentUser = req.user;
      await UserService.deleteUser(currentUser);
      ResponseService.sendSuccessResponse(res, true);
    } catch (err) {
      return next(err);
    }
  },
};
