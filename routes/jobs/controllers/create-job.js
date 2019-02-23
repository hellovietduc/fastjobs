const { Job } = require('../../../models');
const { handleValidationError } = require('../../../utils/error-handlers');

module.exports = (req, res, next) => {
  Job.create(req.body)
    .then(job => res.status(201).json({ job: job.toObject() }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        handleValidationError(err.errors, res);
      } else {
        next(err);
      }
    });
};
