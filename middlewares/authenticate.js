const passport = require('../config/passport');

const userTypes = ['candidate', 'employer'];

module.exports = (req, res, next) => {
  const { body: { user_type: userType } } = req;
  if (!userType || !userTypes.includes(userType)) {
    return res.status(400).json({ error: { message: 'Invalid user type.' } });
  }

  const fields = Object.keys(req.body);
  const strategyName = `local.${userType}.${fields.includes('phone_number') ? 'phone_number' : 'email'}`;
  passport.authenticate(strategyName, { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: { message: info.message } });
    req.user = user;
    next();
  })(req, res, next);
};
