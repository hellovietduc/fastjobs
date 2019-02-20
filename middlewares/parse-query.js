module.exports = (parsers, options = {}) => (req, res, next) => {
  const {
    parseConditions,
    parseMapConditions,
    parseProjection,
    parseSort,
    parsePagination,
  } = parsers;
  const { sortValues, mapProjection } = options;
  const { query } = req;
  req.conditions = parseConditions ? parseConditions(query) : {};
  req.projection = `${parseMapConditions ? mapProjection : ''} ${parseProjection ? parseProjection(query) : ''}`;
  req.sort = parseSort ? parseSort(query, sortValues) : '';
  req.pagination = parsePagination ? parsePagination(query) : {};
  req.map = parseMapConditions ? parseMapConditions(query) : {};
  next();
};
