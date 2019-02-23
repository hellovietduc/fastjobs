const { replaceJobId, replaceCity, replaceIndustry } = require('../../../utils/slug-replacers');
const log = require('../../../config/log');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { conditions } = req;
  const promises = [];
  if (id) promises.push(replaceJobId(id));
  if (conditions) {
    const location = conditions['locations.city'];
    const { industries } = conditions;
    if (location) promises.push(replaceCity(location));
    if (industries) promises.push(replaceIndustry(industries));
  }

  if (promises.length === 0) return next();
  Promise.all(promises)
    .then((results) => {
      if (id) req.params.id = results.shift();
      if (conditions) {
        const location = conditions['locations.city'];
        const { industries } = conditions;
        if (location) conditions['locations.city'] = results.shift();
        if (industries) conditions.industries = results.shift();
      }
      next();
    })
    .catch((err) => {
      log.error(err);
      next();
    });
};
