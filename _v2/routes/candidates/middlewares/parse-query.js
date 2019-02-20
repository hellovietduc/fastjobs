const { intersection } = require('lodash');
const { parseProjection, parsePagination } = require('../../../middlewares/query-parsers');

const allowedSort = [
  'date_of_birth', '-date_of_birth',
  'experience', '-experience',
  'views', '-views',
  'last_update', '-last_update',
];

const parseConditions = (query) => {
  const conditions = new Map();
  conditions.set('industries', query.industry);
  conditions.set('location.work_locations', query.location);
  conditions.set('qualification.academic_level', query.academic_level);
  conditions.set('desire.position', query.position);
  conditions.set('work_experience.label', query.experience);
  conditions.set('foreign_languages', query.foreign_language);
  conditions.set('gender', query.gender);
  conditions.set('desire.salary', query.salary);

  return Array.from(conditions)
    .filter(e => !!e[1])
    .reduce((previous, current) => ({ ...previous, [current[0]]: current[1] }), {});
};

const parseSort = (query) => {
  if (query.sort) {
    const sort = query.sort.split(',');
    return intersection(sort, allowedSort).join(' ')
      .replace('date_of_birth', 'date_of_birth_raw')
      .replace('experience', 'work_experience.exp')
      .replace('views', '_views')
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
