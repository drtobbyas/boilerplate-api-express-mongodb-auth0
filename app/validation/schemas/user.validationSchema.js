const { ValidationService } = require('../../services/');

module.exports = {
  syncOne() {
    return true;
  },

  updateOne() {
    return ValidationService.createValidationSchema({
      userId: ValidationService.validator('mongoDbId').required(),
      firstName: ValidationService.validator().string().min(1).max(100).optional(),
      lastName: ValidationService.validator().string().min(1).max(100).optional(),
      email: ValidationService.validator().string().email().max(100).optional(),
      image: ValidationService.validator().string().uri({ allowQuerySquareBrackets: true }).min(10).max(500).optional(),
      bio: ValidationService.validator().string().min(1).max(1000).optional(),
    });
  },

  getOne() {
    return ValidationService.createValidationSchema({
      skip: ValidationService.validator().number().required(),
      limit: ValidationService.validator().number().required(),
      userId: ValidationService.validator('mongoDbId').required(),
    });
  },

  getMe() {
    return true;
  },

  getAll() {
    return true;
  },

  deleteOne() {
    return ValidationService.createValidationSchema({
      userId: ValidationService.validator('mongoDbId').required(),
    });
  },
};
