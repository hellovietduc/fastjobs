const { Candidate } = require('../../../models');
const {
  handleCastObjectIdError,
  catchResourceNotFoundError,
} = require('../../../utils/error-handlers');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const { projection } = req;
  Candidate.findById(id)
    .select(projection)
    .then(candidate => catchResourceNotFoundError({
      resource: candidate,
      modelName: Candidate.modelName,
    }))
    .then(candidate => res.status(200).json({ candidate }))
    .catch((err) => {
      if (err.name === 'CastError') {
        handleCastObjectIdError(err, res, next);
      } else {
        next(err);
      }
    });
};
