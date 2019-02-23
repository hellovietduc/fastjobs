const { Company } = require('../../models');
const { sync, numberDuplicateSlugs, toRedisHashArg } = require('./utils');
const { tasksConfig: { slugsSyncInterval } } = require('../../config/env');
const keys = require('./redis-keys');
const log = require('../../config/log');

(async function syncCompanySlugs() {
  const companies = await Company.find(/* { profile_status: 'verified' } */).select('slug').exec();
  const slugs = companies.map(c => ({ slug: c.slug, value: c._id.toString() }));
  const slugsArg = toRedisHashArg(numberDuplicateSlugs(slugs, Company));
  try {
    sync(keys.company, slugsArg);
    setTimeout(syncCompanySlugs, 12 * slugsSyncInterval);
  } catch (err) {
    log.error(err);
    log.info(`retrying syncing slugs into ${keys.company}`);
    setTimeout(syncCompanySlugs, 1000);
  }
}());
