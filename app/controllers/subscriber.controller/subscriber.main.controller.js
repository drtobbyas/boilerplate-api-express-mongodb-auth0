const serviceContainerManager = require('../../utils/serviceContainerManager');
const { subscriberService, ResponseService } = serviceContainerManager.load(['subscriberService', 'ResponseService']);

module.exports = {

  async create(req, res, next) {
    try {
      await subscriberService.createOne(req.body);
      return ResponseService.sendSuccessResponse(res, true);
    } catch (err) {
      return next(err);
    }
  },

};
