const { isMobilePhone, isEmail } = require('validator');

module.exports = {
  mobilePhone: {
    validator: phoneNumber => isMobilePhone(phoneNumber, 'vi-VN'),
    message: 'Path `phone_number` is not a valid Vietnamese mobile phone number.',
  },
  email: {
    validator: email => isEmail(email),
    message: 'Path `email` is not a valid email.',
  },
};
