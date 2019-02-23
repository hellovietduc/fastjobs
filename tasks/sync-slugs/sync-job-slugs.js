const { Job } = require('../../models');
const { sync, numberDuplicateSlugs, toRedisHashArg } = require('./utils');
const { tasksConfig: { slugsSyncInterval } } = require('../../config/env');
const keys = require('./redis-keys');
const log = require('../../config/log');

(async function syncJobSlugs() {
  const jobs = await Job.find(/* { status: 'approved' } */).select('slug').exec();
  const slugs = jobs.map(c => ({ slug: c.slug, value: c._id.toString() }));
  const slugsArg = toRedisHashArg(numberDuplicateSlugs(slugs, Job));
  try {
    sync(keys.job, slugsArg);
    setTimeout(syncJobSlugs, 3 * slugsSyncInterval);
  } catch (err) {
    log.error(err);
    log.info(`retrying syncing slugs into ${keys.job}`);
    setTimeout(syncJobSlugs, 1000);
  }
}());
