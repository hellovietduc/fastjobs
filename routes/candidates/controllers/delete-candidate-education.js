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
      const education = candidate.education.map((e) => {
        if (e.school_id) e.school_id = e.school_id.toString();
        return e;
      });
      if (!findObjectInArray(req.body.$pull.education, education)) {
        res.status(404).json({ error: { message: 'School not found in this candidate.' } });
      } else {
        res.status(200).json({ error: { message: 'School removed from this candidate.' } });
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
