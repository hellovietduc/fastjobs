const { intersection } = require('lodash');
const { replaceAll } = require('./string');

const parseProjection = query => (query.fields ? `slug ${replaceAll(query.fields, ',', ' ')}` : '');

const parseSort = (query, allowedSort) => (query.sort
  ? intersection(query.sort.split(','), allowedSort).join(' ')
  : '');

const parsePagination = (query) => {
  const page = parseInt(query.page, 10);
  const size = parseInt(query.size, 10);
  return {
    page: (!page || page <= 0) ? 1 : page,
    size: (!size || size <= 0) ? 10 : size,
  };
};

module.exports = {
  parseProjection,
  parseSort,
  parsePagination,
};
