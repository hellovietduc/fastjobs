const { body } = require('express-validator/check');
const { catchErrors, validatePassword } = require('../../../middlewares/validators');
const Employer = require('../../../models/account-employer');

const validateEmail = body('email')
  .isEmail()
  .withMessage('is not valid')
  .custom(email => Employer.countDocuments({ 'email.value': email })
    .then(count => count > 0)
    .then(exists => (exists ? Promise.reject(new Error('already exists')) : Promise.resolve()))
    .catch(err => Promise.reject(err)))
  .normalizeEmail();

module.exports = [
  validateEmail,
  validatePassword,
  catchErrors,
];
