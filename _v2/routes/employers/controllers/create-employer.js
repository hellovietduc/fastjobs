const Employer = require('../../../models/account-employer');

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  Employer.create({ 'email.value': email, password })
    .then(employer => res.status(201).json({
      employer: { ...employer.toObject({ versionKey: false }) },
    }))
    .catch(err => next(err));
};
