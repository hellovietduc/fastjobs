const jwt = require('jsonwebtoken');
const { jwt: { secret, expiresIn, issuer } } = require('../config/env');

const generateToken = (user) => {
  const data = {
    _model: user._model,
    phone_number: user.phone_number,
    email: user.email,
    password: user.password,
  };
  const options = {
    expiresIn,
    issuer,
    subject: user._id.toString(),
  };
  return new Promise((resolve, reject) => {
    jwt.sign(data, secret, options, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};

module.exports = {
  generateToken,
};
