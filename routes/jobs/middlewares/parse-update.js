const { catchNoContentUpdateError } = require('../../../utils/error-handlers');
const { removeFalsey } = require('../../../utils/object');
const { parseArray } = require('../../../utils/body-parsers');
const { slugify } = require('../../../utils/string');
const { Address } = require('../../../models/child-schemas');

const parseUpdate = (req, res, next) => {
  const { body } = req;
  const locations = parseArray(body.locations, Address.getPaths());
  req.body = {
    $set: removeFalsey({
      ...body,
      status: 'approving',
      company_id: undefined,
      company_slug: undefined,
      company_name: undefined,
      company_logo: undefined,
      views: undefined,
      slug: slugify(body.title),
      locations: locations.length > 0 && locations,
    }),
  };
  catchNoContentUpdateError(req.body.$set, res, next);
};

const parseJobStatus = (req, res, next) => {
  const { body } = req;
  req.body = {
    $set: {
      status: body.status,
    },
  };
  next();
};

module.exports = {
  parseUpdate,
  parseJobStatus,
};
