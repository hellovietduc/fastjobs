const { generateToken } = require('../../../utils/auth');

module.exports = (req, res, next) => {
  generateToken(req.user)
    .then(token => res.status(200).json({ token }))
    .catch(err => next(err));
};
