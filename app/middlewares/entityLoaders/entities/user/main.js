const serviceContainerManager = require('../../../../utils/serviceContainerManager');
const { userService } = serviceContainerManager.load(['userService']);
const MainLoader = require('../../main');
const { NotFound } = require(`${basePath}/app/utils/apiErrors`);
const mainHelper = require(`${basePath}/app/helpers`);

module.exports = {

  async updateOne(req, res, next) {

    try {
      const userFound = await userService.getById(req.params.userId);

      if (!mainHelper.isObjectValid(userFound)) {
        throw new NotFound('user not found');
      }

      MainLoader.setEntities(req, { user: userFound });
      return next();

    } catch (err) {
      return next(err);
    }

  },

  async getOne(req, res, next) {
    try {
      const userFound = await userService.getById(req.params.userId);
      if (!mainHelper.isObjectValid(userFound)) {
        throw new NotFound('user not found');
      }

      MainLoader.setEntities(req, { user: userFound });
      return next();

    } catch (err) {
      return next(err);
    }
  },


  async getMe(req, res, next) {
    return next();
  },

  async getAll(req, res, next) {

    try {
      const usersFound = await userService.getMany({ query: { _id: { $ne: req.user.id } }, options: { lean: true } });
      MainLoader.setEntities(req, { users: usersFound });
      return next();

    } catch (err) {
      return next(err);
    }
  },

  async deleteOne(req, res, next) {

    try {
      const userFound = await userService.getOne({ query: { _id: req.params.userId }, options: { select: '_id' } });

      if (!mainHelper.isObjectValid(userFound)) {
        throw new NotFound('user not found');
      }

      MainLoader.setEntities(req, { user: userFound });
      return next();

    } catch (err) {
      return next(err);
    }

  },
};
