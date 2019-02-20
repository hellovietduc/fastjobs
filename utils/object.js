const { pickBy, identity } = require('lodash');

const sortKeys = obj => Object.keys(obj)
  .sort()
  .reduce((o, k) => ({ ...o, [k]: obj[k] }), {});

const removeFalsey = obj => pickBy(obj, identity);

module.exports = {
  sortKeys,
  removeFalsey,
};
