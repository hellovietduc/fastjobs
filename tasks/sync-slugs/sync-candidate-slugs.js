const { Candidate } = require('../../models');
const { sync, numberDuplicateSlugs, toRedisHashArg } = require('./utils');
const { tasksConfig: { slugsSyncInterval } } = require('../../config/env');
const keys = require('./redis-keys');
const log = require('../../config/log');

(async function syncCandidateSlugs() {
  const candidates = await Candidate.find(/* { user_status: 'verified' } */).select('slug').exec();
  const slugs = candidates.map(c => ({ slug: c.slug, value: c._id.toString() }));
  const slugsArg = toRedisHashArg(numberDuplicateSlugs(slugs, Candidate));
  try {
    sync(keys.candidate, slugsArg);
    setTimeout(syncCandidateSlugs, 3 * slugsSyncInterval);
  } catch (err) {
    log.error(err);
    log.info(`retrying syncing slugs into ${keys.candidate}`);
    setTimeout(syncCandidateSlugs, 1000);
  }
}());
