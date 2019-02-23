const { Job } = require('../../../models');
const {
  catchResourceNotFoundError,
  handleCastObjectIdError,
} = require('../../../utils/error-handlers');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const { projection } = req;
  Job.findById(id)
    .select(projection)
    .then(job => catchResourceNotFoundError({
      resource: job,
      modelName: Job.modelName,
    }))
    .then(job => res.status(200).json({ job }))
    .catch((err) => {
      if (err.name === 'CastError') {
        handleCastObjectIdError(err, res, next);
      } else {
        next(err);
      }
    });
};
