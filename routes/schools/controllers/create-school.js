const { School } = require('../../../models');
const { handleValidationError } = require('../../../utils/error-handlers');

module.exports = (req, res, next) => {
  School.create(req.body)
    .then(school => res.status(201).json({ school: school.toObject() }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        handleValidationError(err.errors, res);
      } else {
        next(err);
      }
    });
};
