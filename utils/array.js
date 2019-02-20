const haveAtLeastOneEqualElement = (arr1, arr2) => arr1.some(e => arr2.includes(e));

const findObjectInArray = (obj, arr) => {
  const objKeys = Object.keys(obj);
  return arr.reduce((acc, cur) => acc || objKeys.every(k => obj[k] === cur[k]), false);
};

module.exports = {
  haveAtLeastOneEqualElement,
  findObjectInArray,
};
