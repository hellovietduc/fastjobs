const { catchNoContentUpdateError } = require('../../../utils/error-handlers');
const { removeFalsey } = require('../../../utils/object');
const { parseArray } = require('../../../utils/body-parsers');
const { slugify } = require('../../../utils/string');
const { Address } = require('../../../models/child-schemas');

const parseUpdate = (req, res, next) => {
  const { body } = req;
  const addresses = parseArray(body.addresses, Address.getPaths());
  req.body = {
    $set: removeFalsey({
      ...body,
      profile_status: undefined,
      slug: slugify(body.name),
      addresses: addresses.length > 0 && addresses,
    }),
  };
  catchNoContentUpdateError(req.body.$set, res, next);
};

module.exports = {
  parseUpdate,
};
