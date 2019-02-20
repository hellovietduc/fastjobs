const { School } = require('../../models');
const { sync, numberDuplicateSlugs, toRedisHashArg } = require('./utils');
const { tasksConfig: { slugsSyncInterval } } = require('../../config/env');
const keys = require('./redis-keys');
const log = require('../../config/log');

(async function syncSchoolSlugs() {
  const schools = await School.find(/* { profile_status: 'verified' } */).select('slug').exec();
  const slugs = schools.map(c => ({ slug: c.slug, value: c._id.toString() }));
  const slugsArg = toRedisHashArg(numberDuplicateSlugs(slugs, School));
  try {
    sync(keys.school, slugsArg);
    setTimeout(syncSchoolSlugs, 12 * slugsSyncInterval);
  } catch (err) {
    log.error(err);
    log.info(`retrying syncing slugs into ${keys.school}`);
    setTimeout(syncSchoolSlugs, 1000);
  }
}());
