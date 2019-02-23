const { Employer } = require('../../../models');
const {
  catchResourceNotFoundError,
  handleCastObjectIdError,
} = require('../../../utils/error-handlers');

module.exports = (req, res, next) => {
  const { id } = req.params;
  Employer.findById(id)
    .then(employer => catchResourceNotFoundError({
      resource: employer,
      modelName: Employer.modelName,
    }))
    .then(employer => res.status(200).json({ employer }))
    .catch((err) => {
      if (err.name === 'CastError') {
        handleCastObjectIdError(err, res, next);
      } else {
        next(err);
      }
    });
};
