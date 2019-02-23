const { Company } = require('../../../models');
const {
  catchResourceNotFoundError,
  handleValidationError,
  handleCastObjectIdError,
} = require('../../../utils/error-handlers');
const { updateConfig } = require('../../config');

module.exports = (req, res, next) => {
  Company.findByIdAndUpdate(req.params.id, req.body, updateConfig)
    .then(company => catchResourceNotFoundError({
      resource: company,
      modelName: Company.modelName,
    }))
    .then(company => res.status(200).json({ company: company.toObject() }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        handleValidationError(err.errors, res);
      } else if (err.name === 'CastError') {
        handleCastObjectIdError(err, res, next);
      } else {
        next(err);
      }
    });
};
