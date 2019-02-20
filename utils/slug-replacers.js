const Redis = require('../config/db/redis');
const keys = require('../tasks/sync-slugs/redis-keys');
const log = require('../config/log');

const createReplacer = key => async (slug) => {
  try {
    const value = await Redis.hgetAsync(key, slug);
    return value || slug;
  } catch (err) {
    log.error(err);
    return slug;
  }
};

module.exports = {
  replaceCandidateId: createReplacer(keys.candidate),
  replaceCompanyId: createReplacer(keys.company),
  replaceSchoolId: createReplacer(keys.school),
  replaceJobId: createReplacer(keys.job),
  replaceIndustry: createReplacer(keys.industry),
  replaceCity: createReplacer(keys.city),
};
