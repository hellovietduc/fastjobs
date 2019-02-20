const { removeFalsey } = require('../../../utils/object');

const parseConditions = query => removeFalsey({
  'addresses.city': query.location,
  industries: query.industry,
  founded_year: query.founded_year,
  size: query.company_size,
});

const sortValues = [
  'size', '-size',
  'founded_year', '-founded_year',
];

module.exports = {
  parseConditions,
  sortValues,
};
