const { replaceCandidateId, replaceCity, replaceIndustry } = require('../../../utils/slug-replacers');
const log = require('../../../config/log');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { conditions } = req;
  const promises = [];
  if (id) promises.push(replaceCandidateId(id));
  if (conditions) {
    const { work_locations: workLocations, industries } = conditions;
    if (workLocations) promises.push(replaceCity(workLocations));
    if (industries) promises.push(replaceIndustry(industries));
  }

  if (promises.length === 0) return next();
  Promise.all(promises)
    .then((results) => {
      if (id) req.params.id = results.shift();
      if (conditions) {
        const { work_locations: workLocations, industries } = conditions;
        if (workLocations) conditions.work_locations = results.shift();
        if (industries) conditions.industries = results.shift();
      }
      next();
    })
    .catch((err) => {
      log.error(err);
      next();
    });
};
