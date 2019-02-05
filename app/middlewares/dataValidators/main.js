const { BadRequest } = require(`${basePath}/app/utils/apiErrors/index`);
const { ValidationService } = require('../../services');


const mainDataValidator = {

  validateSync(validationSchema, req, next) {
    const validationResult = ValidationService.validateIncomingRequest(req, validationSchema);
    if (validationResult.success) {
      return next();
    }
    return next(new BadRequest(validationResult.error));
  },

  validateErrorsAsync(req) {

    return req
      .asyncValidationErrors()
      .catch(handleDataErrors)
      .finally((dataErrors) => {
        return dataErrors;
      });
  },

  validateErrorsSync(req) {
    return req.getValidationResult();
  },

  async handleValidationResult(dataValidationResultPromise, res, next) {

    const validationResult = await dataValidationResultPromise;
    if (!validationResult.isEmpty()) {
      return next(new BadRequest(JSON.stringify(validationResult.mapped())));
    }
    return next();
  },


  validatePagination(req, res, next) {
    req.query.skip = !Number.isNaN(Number(req.query.skip)) ? Number(req.query.skip) : 0;
    req.query.limit = !Number.isNaN(Number(req.query.limit)) ? Number(req.query.limit) : 0;

    return next();
  },

};

module.exports = mainDataValidator;


function handleDataErrors(errors) {
  return errors;
}

