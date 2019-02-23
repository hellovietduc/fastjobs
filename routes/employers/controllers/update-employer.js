const { Employer } = require('../../../models');
const { generateToken } = require('../../../utils/auth');
const { haveAtLeastOneEqualElement } = require('../../../utils/array');
const {
  catchResourceNotFoundError,
  handleValidationError,
  handleCastObjectIdError,
} = require('../../../utils/error-handlers');
const { updateConfig, sensitiveFields } = require('../../config');

module.exports = (req, res, next) => {
  Employer.findByIdAndUpdate(req.params.id, req.body, updateConfig)
    .lean()
    .then(employer => catchResourceNotFoundError({
      resource: employer,
      modelName: Employer.modelName,
    }))
    .then(async (employer) => {
      if (req.method === 'DELETE') {
        res.status(204).end();
      } else {
        const updateFields = Object.keys(req.body.$set || {});
        const needNewToken = haveAtLeastOneEqualElement(updateFields, sensitiveFields);
        const token = needNewToken
          ? await generateToken({ ...employer, _model: Employer.modelName })
          : undefined;
        res.status(200).json({ employer, token });
      }
    })
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
