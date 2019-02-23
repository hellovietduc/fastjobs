const { Industries } = require('../../models/enums/common');
const { slugify } = require('../../utils/string');
const { sync } = require('./utils');
const keys = require('./redis-keys');
const log = require('../../config/log');

(function syncIndustrySlugs() {
  const slugs = Industries.reduce((p, c) => [...p, slugify(c), c], []);
  try {
    sync(keys.industry, slugs);
  } catch (err) {
    log.error(err);
    log.info(`retrying syncing slugs into ${keys.industry}`);
    setTimeout(syncIndustrySlugs, 1000);
  }
}());
