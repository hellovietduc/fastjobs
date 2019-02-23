const Redis = require('../../../../config/db/redis');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { conditions } = req;
  try {
    if (id) {
      const _id = await Redis.hgetAsync('candidate-slugs', id);
      if (_id) req.params.id = _id;
    }
    if (conditions.industries) {
      const industry = await Redis.hgetAsync('industry-slugs', conditions.industries);
      if (industry) conditions.industries = industry;
    }
    if (conditions['location.work_locations']) {
      const location = await Redis.hgetAsync('location-slugs', conditions['location.work_locations']);
      if (location) conditions['location.work_locations'] = location;
    }
    next();
  } catch (err) {
    next(err);
  }
};
