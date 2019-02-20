const Redis = require('../../../../config/db/redis');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { conditions } = req;
  try {
    if (id) {
      const _id = await Redis.hgetAsync('job-slugs', id);
      if (_id) req.params.id = _id;
    }
    if (conditions.industries) {
      const industry = await Redis.hgetAsync('industry-slugs', conditions.industries);
      if (industry) conditions.industries = industry;
    }
    if (conditions.locations) {
      const location = await Redis.hgetAsync('location-slugs', conditions.locations);
      if (location) conditions.locations = location;
    }
    next();
  } catch (err) {
    next(err);
  }
};
