const Employer = require('../../../models/account-employer');
const Redis = require('../../../../config/db/redis');
const { createKey } = require('../../../../utils/redis');

module.exports = async (req, res, next) => {
  const key = createKey('employer-count', req.conditions);
  try {
    const employerCount = parseInt(await Redis.getAsync(key), 10);
    if (employerCount) {
      req.employerCount = employerCount;
    } else {
      req.employerCount = await Employer.countDocuments(req.conditions);
      await Redis.setexAsync(key, 60 * 60, req.employerCount);
    }
    next();
  } catch (err) {
    next(err);
  }
};
