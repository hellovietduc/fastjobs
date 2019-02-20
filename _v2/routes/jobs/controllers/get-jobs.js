const Job = require('../../../models/job');

module.exports = (req, res, next) => {
  const {
    conditions, projection, sort, jobCount,
  } = req;
  const { page, size } = req.pagination;

  Job.find(conditions)
    .select(projection)
    .limit(size)
    .skip((page - 1) * size)
    .sort(sort)
    .then(jobs => res.status(200).json({
      _total: jobCount,
      _page: page,
      _size: size,
      jobs,
    }))
    .catch(err => next(err));
};
