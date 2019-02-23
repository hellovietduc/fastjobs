const { removeFalsey } = require('../../../utils/object');
const { parseArray } = require('../../../utils/body-parsers');
const { slugify } = require('../../../utils/string');
const { Address } = require('../../../models/child-schemas');

module.exports = (req, res, next) => {
  const { body } = req;
  req.body = removeFalsey({
    ...body,
    status: undefined,
    views: undefined,
    slug: slugify(body.title),
    locations: parseArray(body.locations, Address.getPaths()),
  });
  next();
};
