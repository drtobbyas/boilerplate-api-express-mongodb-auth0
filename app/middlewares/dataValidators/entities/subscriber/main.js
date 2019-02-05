const mainValidator = require('../../main');
const subscriberValidationSchema = require('../../../../validation/schemas/subscriber.validationSchema');

module.exports = {
  create(req, res, next) {
    return mainValidator.validateSync(subscriberValidationSchema.create(), req, next);
  },
};
