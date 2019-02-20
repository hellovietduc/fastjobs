const { Employer } = require('../../../models');
const { generateToken } = require('../../../utils/auth');
const { handleValidationError } = require('../../../utils/error-handlers');

module.exports = (req, res, next) => {
  Employer.create(req.body)
    .then(employer => employer.toObject())
    .then(async (employer) => {
      const token = await generateToken({ ...employer, _model: Employer.modelName });
      res.status(201).json({ employer, token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        handleValidationError(err.errors, res);
      } else {
        next(err);
      }
    });
};
