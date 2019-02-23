const { Candidate } = require('../../../models');
const { generateToken } = require('../../../utils/auth');
const { haveAtLeastOneEqualElement } = require('../../../utils/array');
const {
  catchResourceNotFoundError,
  handleValidationError,
  handleCastObjectIdError,
} = require('../../../utils/error-handlers');
const { updateConfig, sensitiveFields } = require('../../config');

module.exports = (req, res, next) => {
  Candidate.findByIdAndUpdate(req.params.id, req.body, updateConfig)
    .lean()
    .then(candidate => catchResourceNotFoundError({
      resource: candidate,
      modelName: Candidate.modelName,
    }))
    .then(async (candidate) => {
      if (req.method === 'DELETE') {
        res.status(204).end();
      } else {
        const updateFields = Object.keys(req.body.$set || {});
        const needNewToken = haveAtLeastOneEqualElement(updateFields, sensitiveFields);
        const token = needNewToken
          ? await generateToken({ ...candidate, _model: Candidate.modelName })
          : undefined;
        res.status(200).json({ candidate, token });
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
