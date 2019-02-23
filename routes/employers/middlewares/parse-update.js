const { catchNoContentUpdateError } = require('../../../utils/error-handlers');
const { removeFalsey } = require('../../../utils/object');

const parseUpdate = (req, res, next) => {
  const { body } = req;
  req.body = {
    $set: removeFalsey({
      ...body,
      user_status: undefined,
      email: undefined,
      phone_number: undefined,
      password: undefined,
      access_token: undefined,
      company_id: undefined,
    }),
  };
  catchNoContentUpdateError(req.body.$set, res, next);
};

const parseUpsertCompany = (req, res, next) => {
  const { body } = req;
  req.body = {
    $set: {
      company_id: body.company_id,
    },
  };
  next();
};

const parseRemoveCompany = (req, res, next) => {
  req.body = {
    $unset: {
      company_id: 1,
    },
  };
  next();
};

module.exports = {
  parseUpdate,
  parseUpsertCompany,
  parseRemoveCompany,
};
