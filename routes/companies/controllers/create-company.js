const { Company } = require('../../../models');
const { handleValidationError } = require('../../../utils/error-handlers');

module.exports = (req, res, next) => {
  Company.create(req.body)
    .then(company => res.status(201).json({ company: company.toObject() }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        handleValidationError(err.errors, res);
      } else {
        next(err);
      }
    });
};
