const { ResponseService, ServerService } = require(`${basePath}/app/services`);

module.exports = {
  main(req, res, next) {
    ResponseService.sendSuccessResponse(res, { uptime: ServerService.getServerUptime() });
  },

  status(req, res, next) {
    ResponseService.sendSuccessResponse(res, { status: 'OK', uptime: ServerService.getServerUptime() });
  },
};
