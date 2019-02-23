const bcrypt = require('bcrypt');

const parseUserStatus = (req, res, next) => {
  const { body } = req;
  req.body = {
    $set: {
      user_status: req.method === 'DELETE' ? 'deleted' : body.user_status,
    },
  };
  next();
};

const parsePhoneNumber = (req, res, next) => {
  const { body } = req;
  req.body = {
    $set: {
      phone_number: body.phone_number,
    },
  };
  next();
};

const parseEmail = (req, res, next) => {
  const { body } = req;
  req.body = {
    $set: {
      email: body.email,
    },
  };
  next();
};

const parsePassword = async (req, res, next) => {
  const { body } = req;
  try {
    req.body = {
      $set: {
        password: await bcrypt.hash(body.password, 10),
      },
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  parseUserStatus,
  parsePhoneNumber,
  parseEmail,
  parsePassword,
};
