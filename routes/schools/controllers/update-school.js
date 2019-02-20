const { School } = require('../../../models');
const {
  catchResourceNotFoundError,
  handleValidationError,
  handleCastObjectIdError,
} = require('../../../utils/error-handlers');
const { updateConfig } = require('../../config');

module.exports = (req, res, next) => {
  School.findByIdAndUpdate(req.params.id, req.body, updateConfig)
    .then(school => catchResourceNotFoundError({
      resource: school,
      modelName: School.modelName,
    }))
    .then(school => res.status(200).json({ school: school.toObject() }))
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
