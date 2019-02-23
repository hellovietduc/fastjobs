const Redis = require('../../config/db/redis');
const log = require('../../config/log');

const sync = (key, slugs) => {
  if (slugs.length >= 2) {
    Redis.del(key);
    Redis.hmset(key, slugs);
    Redis.hlenAsync(key).then(n => log.info(`synced ${n} slugs into ${key}`));
  }
};

const numberDuplicateSlugs = (slugs, Model) => {
  const nonDups = [];
  const dups = [];
  const numberedDups = [];
  const bulkUpdates = [];

  slugs.forEach((s) => {
    if (!nonDups.includes(s.slug)) {
      nonDups.push(s.slug);
      numberedDups.push(s);
    } else {
      const lastDup = dups.filter(d => d.slug === s.slug).sort((a, b) => b.number - a.number)[0];
      const count = lastDup ? lastDup.number + 1 : 2;
      const newSlug = `${s.slug}-${count}`;
      dups.push({ slug: s.slug, number: count });
      numberedDups.push({ slug: newSlug, value: s.value });
      if (Model) {
        bulkUpdates.push({
          updateOne: {
            filter: { _id: s.value },
            update: { slug: newSlug },
          },
        });
      }
    }
  });

  if (bulkUpdates.length > 0) {
    Model.bulkWrite(bulkUpdates)
      .then(res => log.info(`updated ${res.modifiedCount} slugs in ${Model.collection.collectionName}`))
      .catch(err => log.error(err));
  }

  return numberedDups;
};

const toRedisHashArg = slugs => slugs.reduce((p, c) => [...p, c.slug, c.value], []);

module.exports = {
  sync,
  numberDuplicateSlugs,
  toRedisHashArg,
};
