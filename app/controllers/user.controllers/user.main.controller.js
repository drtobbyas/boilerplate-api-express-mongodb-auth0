
const serviceContainerManager = require('../../utils/serviceContainerManager');
const { userService, ResponseService, EntityLoaderService } = serviceContainerManager.load(['userService', 'ResponseService', 'EntityLoaderService']);

module.exports = {


  async syncOne(req, res, next) {
    try {
      /**
     * Auth0 User Data taken from token
     */
      const remoteUserData = req.user;
      const userSynced = await userService.syncOne(remoteUserData);

      return ResponseService.sendSuccessResponse(res, userSynced);
    } catch (err) {
      return next(err);
    }
  },

  async updateOne(req, res, next) {
    try {
      const currentUserId = req.user._id;
      const updateData = req.body;

      const updatedUser = await userService.updateById(currentUserId, updateData);
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
      await userService.deleteUser(currentUser);
      ResponseService.sendSuccessResponse(res, true);
    } catch (err) {
      return next(err);
    }
  },
};
