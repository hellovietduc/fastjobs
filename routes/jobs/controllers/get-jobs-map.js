const { Job } = require('../../../models');

module.exports = (req, res, next) => {
  const { conditions, projection } = req;
  const { coords, radius } = req.map;
  const mapConditions = {
    ...conditions,
    geo_location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: coords,
        },
        $maxDistance: radius,
      },
    },
  };
  Job.find(mapConditions)
    .select(projection)
    .then(jobs => res.status(200).json({
      total: jobs.length,
      jobs,
    }))
    .catch(err => next(err));
};
