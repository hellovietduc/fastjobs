const Job = require('../../../models/job');
const Redis = require('../../../../config/db/redis');
const { createKey } = require('../../../../utils/redis');

module.exports = async (req, res, next) => {
  const key = createKey('job-count', req.conditions);
  try {
    const jobCount = parseInt(await Redis.getAsync(key), 10);
    if (jobCount) {
      req.jobCount = jobCount;
    } else {
      req.jobCount = await Job.countDocuments(req.conditions);
      await Redis.setexAsync(key, 60 * 60, req.jobCount);
    }
    next();
  } catch (err) {
    next(err);
  }
};
