const { Company } = require('../../../models');
const {
  catchResourceNotFoundError,
  handleCastObjectIdError,
} = require('../../../utils/error-handlers');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const { projection } = req;
  Company.findById(id)
    .select(projection)
    .then(company => catchResourceNotFoundError({
      resource: company,
      modelName: Company.modelName,
    }))
    .then(company => res.status(200).json({ company }))
    .catch((err) => {
      if (err.name === 'CastError') {
        handleCastObjectIdError(err, res, next);
      } else {
        next(err);
      }
    });
};
