const { Job } = require('../../../models');
const { handleCastObjectIdError } = require('../../../utils/error-handlers');

module.exports = (req, res, next) => {
  Job.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => {
      if (err.name === 'CastError') {
        handleCastObjectIdError(err, res, next);
      } else {
        next(err);
      }
    });
};
