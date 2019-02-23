const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { replaceAll } = require('../../utils/string');

module.exports = (Model, usernameField) => new Strategy({
  usernameField,
}, (username, password, done) => {
  const condition = { [usernameField]: username };
  const usernameFieldString = replaceAll(usernameField, '_', ' ');
  Model.findOne(condition)
    .select('phone_number email password')
    .lean()
    .then(async (user) => {
      if (!user) {
        done(null, false, { message: `Incorrect ${usernameFieldString} or password.` });
      } else if (!await bcrypt.compare(password, user.password)) {
        done(null, false, { message: `Incorrect ${usernameFieldString} or password.` });
      } else {
        done(null, { ...user, _model: Model.modelName });
      }
    })
    .catch(err => done(err));
});
