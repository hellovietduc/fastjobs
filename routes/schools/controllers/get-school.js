const { School } = require('../../../models');
const {
  catchResourceNotFoundError,
  handleCastObjectIdError,
} = require('../../../utils/error-handlers');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const { projection } = req;
  School.findById(id)
    .select(projection)
    .then(school => catchResourceNotFoundError({
      resource: school,
      modelName: School.modelName,
    }))
    .then(school => res.status(200).json({ school }))
    .catch((err) => {
      if (err.name === 'CastError') {
        handleCastObjectIdError(err, res, next);
      } else {
        next(err);
      }
    });
};
