const { ResponseService, FileUploadService } = require(`${basePath}/app/services`);
const { BadRequest } = require(`${basePath}/app/utils/apiErrors`);

module.exports = {
  async uploadFile(req, res, next) {
    try {
      const { file } = req;

      if (!(file && file.originalname && file.buffer)) {
        throw new BadRequest('valid file should be provided');
      }

      const fileUploadResult = await FileUploadService.upload(file.buffer, file.originalname);
      ResponseService.sendSuccessResponse(res, fileUploadResult);
    } catch (err) {
      ResponseService.sendErrorResponse(res, err);
    }
  },
};
