const { ValidationService } = require('../../services/');
module.exports = {
  create() {
    return ValidationService.createValidationSchema({
      email: ValidationService.validator().string().email().required().trim(),
    });
  },
};
