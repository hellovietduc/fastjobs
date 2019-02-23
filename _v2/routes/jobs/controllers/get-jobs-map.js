const Job = require('../../../models/job');

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
      _total: jobs.length,
      _lng: coords[0],
      _lat: coords[1],
      _radius: radius / 1000,
      jobs,
    }))
    .catch(err => next(err));
};
