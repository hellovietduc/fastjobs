const Redis = require('../config/db/redis');
const { sortKeys } = require('./object');

const createKey = (prefix, object) => `${prefix}:${JSON.stringify(sortKeys(object))}`;

const replaceHash = (source, dest) => new Promise(async (resolve, reject) => {
  try {
    await Redis.delAsync(dest);
    await Redis.hmsetAsync(dest, source);
    const num = await Redis.hlenAsync(dest);
    resolve(num);
  } catch (err) {
    reject(err);
  }
});

module.exports = {
  createKey,
  replaceHash,
};
