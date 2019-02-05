const mainValidator = require('../../main');
const validationSchema = require('../../../../validation/schemas/user.validationSchema');

module.exports = {
  syncOne(req, res, next) {
    return mainValidator.validateSync(validationSchema.syncOne(), req, next);
  },

  updateOne(req, res, next) {
    return mainValidator.validateSync(validationSchema.updateOne(), req, next);
  },

  getOne(req, res, next) {
    return mainValidator.validateSync(validationSchema.getOne(), req, next);
  },

  getMe(req, res, next) {
    return mainValidator.validateSync(validationSchema.getMe(), req, next);
  },

  getAll(req, res, next) {
    return mainValidator.validateSync(validationSchema.getAll(), req, next);
  },

  deleteOne(req, res, next) {
    return mainValidator.validateSync(validationSchema.deleteOne(), req, next);
  },
};
