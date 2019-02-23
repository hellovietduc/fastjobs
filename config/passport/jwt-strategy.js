/* eslint-disable global-require */

const { Strategy, ExtractJwt } = require('passport-jwt');
const { jwt: { secret, issuer } } = require('../env');

module.exports = () => new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
  issuer,
}, (payload, done) => {
  const Model = require('../../models')[payload._model];
  const condition = {
    _id: payload.sub,
    phone_number: payload.phone_number,
    email: payload.email,
    password: payload.password,
  };
  Model.findOne(condition)
    .select('phone_number email password')
    .lean()
    .then((user) => {
      if (!user) {
        done(null, false, { message: 'Invalid token.' });
      } else {
        done(null, user);
      }
    })
    .catch(err => done(err));
});
