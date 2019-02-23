const { intersection } = require('lodash');
const { parseProjection, parsePagination } = require('../../../middlewares/query-parsers');

const allowedSort = [
  'size', '-size',
  'last_update', '-last_update',
];

const parseConditions = (query) => {
  const conditions = new Map();
  conditions.set('company_info.city', query.location);
  conditions.set('company_info.size', query.company_size);

  return Array.from(conditions)
    .filter(e => !!e[1])
    .reduce((previous, current) => ({ ...previous, [current[0]]: current[1] }), {});
};

const parseSort = (query) => {
  if (query.sort) {
    const sort = query.sort.split(',');
    return intersection(sort, allowedSort).join(' ')
      .replace('size', 'company_info.size')
      .replace('last_update', '-_updated_at')
      .replace('--', '');
  }
  return '';
};

module.exports = options => (req, res, next) => {
  const {
    conditions, projection, sort, pagination,
  } = options;
  const { query } = req;
  req.conditions = conditions ? parseConditions(query) : {};
  req.projection = projection ? parseProjection(query) : '';
  req.sort = sort ? parseSort(query) : '';
  req.pagination = pagination ? parsePagination(query) : {};
  next();
};
