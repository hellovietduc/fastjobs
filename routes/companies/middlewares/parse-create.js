const { removeFalsey } = require('../../../utils/object');
const { parseArray } = require('../../../utils/body-parsers');
const { slugify } = require('../../../utils/string');
const { Address } = require('../../../models/child-schemas');

module.exports = (req, res, next) => {
  const { body } = req;
  req.body = removeFalsey({
    ...body,
    profile_status: undefined,
    slug: slugify(body.name),
    addresses: parseArray(body.addresses, Address.getPaths()),
  });
  next();
};
