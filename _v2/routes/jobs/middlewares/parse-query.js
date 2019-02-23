const { intersection } = require('lodash');
const { parseProjection, parsePagination } = require('../../../middlewares/query-parsers');

const allowedSort = [
  'quantity', '-quantity',
  'deadline', '-deadline',
  'views', '-views',
  'last_update', '-last_update',
  'salary', '-salary',
  'experience', '-experience',
];

const mapProjection = [
  '_slug',
  'title',
  'locations',
  'salary.label',
  'deadline',
  'employer.name',
  'employer.address',
  'employer.size',
  'employer.city',
  'employer._logo',
  'geo_location.coordinates',
].join(' ');

const parseConditions = (query) => {
  const conditions = new Map();
  conditions.set('industries', query.industry);
  conditions.set('locations', query.location);
  conditions.set('work_type', query.work_type);
  conditions.set('position', query.position);
  conditions.set('salary.max', query.max_salary);
  conditions.set('salary.min', query.min_salary);
  conditions.set('requirements.experience', query.experience);
  conditions.set('requirements.gender', query.gender);

  return Array.from(conditions)
    .filter(e => !!e[1])
    .reduce((previous, current) => ({ ...previous, [current[0]]: current[1] }), {});
};

const parseSort = (query) => {
  if (query.sort) {
    const sort = query.sort.split(',');
    return intersection(sort, allowedSort).join(' ')
      .replace('deadline', 'deadline_raw')
      .replace('views', '_views')
      .replace('last_update', '-_updated_at')
      .replace('salary', 'salary.max')
      .replace('experience', 'requirements.exp')
      .replace('--', '');
  }
  return '';
};

const parseCoords = (query) => {
  if (query.coords) {
    const coordsArray = query.coords.split(',');
    const lng = parseFloat(coordsArray[0]);
    const lat = parseFloat(coordsArray[1]);
    return lng && lat ? [lng, lat] : [];
  }
  return [];
};

const parseRadius = (query) => {
  if (query.radius) {
    const radius = parseInt(query.radius, 10) || 0;
    return (radius <= 0 ? 10 : radius) * 1000;
  }
  return 0;
};

module.exports = options => (req, res, next) => {
  const {
    conditions, projection, sort, pagination, map,
  } = options;
  const { query } = req;
  req.conditions = conditions ? parseConditions(query) : {};
  req.projection = `${map ? mapProjection : ''} ${projection ? parseProjection(query) : ''}`;
  req.sort = sort ? parseSort(query) : '';
  req.pagination = pagination ? parsePagination(query) : {};
  req.map = map ? { coords: parseCoords(query), radius: parseRadius(query) } : {};
  next();
};
