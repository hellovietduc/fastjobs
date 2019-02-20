/* eslint-disable camelcase */

const Candidate = require('../../../models/account-candidate');

module.exports = (req, res, next) => {
  const { phone_number, password } = req.body;
  Candidate.create({ 'phone_number.value': phone_number, password })
    .then(candidate => res.status(201).json({
      candidate: { ...candidate.toObject({ versionKey: false }) },
    }))
    .catch(err => next(err));
};
