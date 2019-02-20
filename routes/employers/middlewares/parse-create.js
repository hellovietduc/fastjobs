const bcrypt = require('bcrypt');
const { removeFalsey } = require('../../../utils/object');

module.exports = async (req, res, next) => {
  const { body } = req;
  try {
    req.body = removeFalsey({
      ...body,
      user_status: undefined,
      password: await bcrypt.hash(body.password, 10),
    });
    next();
  } catch (err) {
    next(err);
  }
};
