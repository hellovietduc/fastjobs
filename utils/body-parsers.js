const { pick } = require('lodash');

const parseArray = (srcArray = [], fields) => {
  const resultArray = [];
  srcArray.forEach((e) => {
    const obj = pick(e, fields);
    if (Object.keys(obj).length > 0) resultArray.push(obj);
  });
  return resultArray;
};

module.exports = {
  parseArray,
};
