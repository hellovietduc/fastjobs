const syncSlugs = require('./sync-slugs');

module.exports = function repeat() {
  syncSlugs();
  setTimeout(repeat, 5 * 60 * 1000);
};
