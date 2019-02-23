const { Cities } = require('../../models/enums/common');
const { slugify } = require('../../utils/string');
const { sync } = require('./utils');
const keys = require('./redis-keys');
const log = require('../../config/log');

(function syncCitySlugs() {
  const slugs = Cities.reduce((p, c) => [...p, slugify(c), c], []);
  try {
    sync(keys.city, slugs);
  } catch (err) {
    log.error(err);
    log.info(`retrying syncing slugs into ${keys.city}`);
    setTimeout(syncCitySlugs, 1000);
  }
}());
