const { replaceAll } = require('../../utils/string');

const parseProjection = query => (query.fields ? `_slug ${replaceAll(query.fields, ',', ' ')}` : '');

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
  parsePagination,
};
