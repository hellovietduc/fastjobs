const { Candidate } = require('../../../models');
const { findObjectInArray } = require('../../../utils/array');
const {
  catchResourceNotFoundError,
  handleValidationError,
  handleCastObjectIdError,
} = require('../../../utils/error-handlers');
const { updateConfig } = require('../../config');

module.exports = (req, res, next) => {
  Candidate.findByIdAndUpdate(req.params.id, req.body, { ...updateConfig, new: false })
    .lean()
    .then(candidate => catchResourceNotFoundError({
      resource: candidate,
      modelName: Candidate.modelName,
    }))
    .then((candidate) => {
      const workExperience = candidate.work_experience.map((e) => {
        if (e.company_id) e.company_id = e.company_id.toString();
        return e;
      });
      if (!findObjectInArray(req.body.$pull.work_experience, workExperience)) {
        res.status(404).json({ error: { message: 'Company not found in this candidate.' } });
      } else {
        res.status(200).json({ error: { message: 'Company removed from this candidate.' } });
      }
    })
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
