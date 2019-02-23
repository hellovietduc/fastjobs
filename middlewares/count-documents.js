const pluralize = require('mongoose-legacy-pluralize');
const { snakeCase } = require('lodash');
const { createKey } = require('../utils/redis');
const Redis = require('../config/db/redis');
const log = require('../config/log');

module.exports = Model => async (req, res, next) => {
  const prefix = `${pluralize(snakeCase(Model.modelName))}.count`;
  const key = createKey(prefix, req.conditions);
  try {
    const totalCount = parseInt(await Redis.getAsync(key), 10);
    if (totalCount) {
      req.totalCount = totalCount;
    } else {
      req.totalCount = await Model.countDocuments(req.conditions);
      await Redis.setexAsync(key, 60 * 60, req.totalCount);
    }
  } catch (err) {
    req.totalCount = -1;
    log.error(err);
  }
  next();
};
