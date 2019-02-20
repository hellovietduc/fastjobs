const { removeFalsey } = require('../../../utils/object');

const parseConditions = query => removeFalsey({
  'addresses.city': query.location,
});

const sortValues = [
  'founded_year', '-founded_year',
];

module.exports = {
  parseConditions,
  sortValues,
};
