const MainLoader = require('../../main');
const { UserService } = require(`${basePath}/app/services/`);
const { NotFound } = require(`${basePath}/app/utils/apiErrors`);
const mainHelper = require(`${basePath}/app/helpers`);

module.exports = {

  async updateOne(req, res, next) {

    try {
      const userFound = await UserService.findById(req.params.userId);

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
      const userFound = await UserService.findById(req.params.userId);
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
      const usersFound = await UserService.findAll({ query: { _id: { $ne: req.user.id } }, options: { lean: true } });
      MainLoader.setEntities(req, { users: usersFound });
      return next();

    } catch (err) {
      return next(err);
    }
  },

  async deleteOne(req, res, next) {

    try {
      const userFound = await UserService.findOne({ query: { _id: req.params.userId }, options: { select: '_id' } });

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
