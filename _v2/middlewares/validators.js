const { validationResult, body } = require('express-validator/check');
const { pick } = require('lodash');

const catchErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(e => pick(e, ['param', 'msg'])),
    });
  }
  return next();
};

const validatePassword = body('password')
  .isLength({ min: 6 })
  .withMessage('must be at least 6 characters')
  .isAlphanumeric()
  .withMessage('can only contain characters from a-z 0-9');

module.exports = {
  catchErrors,
  validatePassword,
};
