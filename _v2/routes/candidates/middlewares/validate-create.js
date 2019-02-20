const { body } = require('express-validator/check');
const { catchErrors, validatePassword } = require('../../../middlewares/validators');
const Candidate = require('../../../models/account-candidate');

const validatePhoneNumber = body('phone_number')
  .isMobilePhone('vi-VN')
  .withMessage('must be a Vietnamese mobile number')
  .custom(phoneNumber => Candidate.countDocuments({ 'phone_number.value': phoneNumber })
    .then(count => count > 0)
    .then(exists => (exists ? Promise.reject(new Error('already exists')) : Promise.resolve()))
    .catch(err => Promise.reject(err)));

module.exports = [
  validatePhoneNumber,
  validatePassword,
  catchErrors,
];
