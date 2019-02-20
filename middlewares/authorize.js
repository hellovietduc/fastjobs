const passport = require('../config/passport');
const { handleJWTError } = require('../utils/error-handlers');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (info && info.name === 'JsonWebTokenError') return handleJWTError(info, res, next);
    if (!user) return res.status(403).json({ error: info.message });
    req.user = user;
    next();
  })(req, res, next);
};
