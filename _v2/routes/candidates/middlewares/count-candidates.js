const Candidate = require('../../../models/account-candidate');
const Redis = require('../../../../config/db/redis');
const { createKey } = require('../../../../utils/redis');

module.exports = async (req, res, next) => {
  const key = createKey('candidate-count', req.conditions);
  try {
    const candidateCount = parseInt(await Redis.getAsync(key), 10);
    if (candidateCount) {
      req.candidateCount = candidateCount;
    } else {
      req.candidateCount = await Candidate.countDocuments(req.conditions);
      await Redis.setexAsync(key, 60 * 60, req.candidateCount);
    }
    next();
  } catch (err) {
    next(err);
  }
};
