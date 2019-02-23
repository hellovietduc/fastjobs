const { Candidate } = require('../../../models');
const { generateToken } = require('../../../utils/auth');
const { handleValidationError } = require('../../../utils/error-handlers');

module.exports = (req, res, next) => {
  Candidate.create(req.body)
    .then(candidate => candidate.toObject())
    .then(async (candidate) => {
      const token = await generateToken({ ...candidate, _model: Candidate.modelName });
      res.status(201).json({ candidate, token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        handleValidationError(err.errors, res);
      } else {
        next(err);
      }
    });
};
