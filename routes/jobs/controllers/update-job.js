const { Job } = require('../../../models');
const {
  catchResourceNotFoundError,
  handleValidationError,
  handleCastObjectIdError,
} = require('../../../utils/error-handlers');
const { updateConfig } = require('../../config');

module.exports = (req, res, next) => {
  Job.findByIdAndUpdate(req.params.id, req.body, updateConfig)
    .then(job => catchResourceNotFoundError({
      resource: job,
      modelName: Job.modelName,
    }))
    .then(job => res.status(200).json({ job: job.toObject() }))
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
