const serviceContainerManager = require('../utils/serviceContainerManager');
const { ServerService, ResponseService } = serviceContainerManager.load(['ServerService', 'ResponseService']);

module.exports = {
  main(req, res, next) {
    ResponseService.sendSuccessResponse(res, { uptime: ServerService.getServerUptime() });
  },

  status(req, res, next) {
    ResponseService.sendSuccessResponse(res, { status: 'OK', uptime: ServerService.getServerUptime() });
  },
};
