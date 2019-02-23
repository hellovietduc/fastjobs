const Redis = require('../../../../config/db/redis');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { conditions } = req;
  try {
    if (id) {
      const _id = await Redis.hgetAsync('employer-slugs', id);
      if (_id) req.params.id = _id;
    }
    if (conditions['company_info.city']) {
      const location = await Redis.hgetAsync('location-slugs', conditions['company_info.city']);
      if (location) conditions['company_info.city'] = location;
    }
    next();
  } catch (err) {
    next(err);
  }
};
