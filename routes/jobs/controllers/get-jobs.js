const { Job } = require('../../../models');

module.exports = (req, res, next) => {
  const {
    conditions,
    projection,
    sort,
    totalCount,
  } = req;
  const { page, size } = req.pagination;
  Job.find(conditions)
    .select(projection)
    .limit(size)
    .skip((page - 1) * size)
    .sort(sort)
    .then(jobs => res.status(200).json({
      total: totalCount,
      page,
      size,
      jobs,
    }))
    .catch(err => next(err));
};
