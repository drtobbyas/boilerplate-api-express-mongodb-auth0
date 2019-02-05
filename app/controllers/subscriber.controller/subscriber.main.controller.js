const { SubscriberService, ResponseService } = require('../../services/');

module.exports = {

  async create(req, res, next) {
    try {
      await SubscriberService.create(req.body);
      return ResponseService.sendSuccessResponse(res, true);
    } catch (err) {
      return next(err);
    }
  },

};
