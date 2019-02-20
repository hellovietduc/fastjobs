const { Candidate } = require('../../../models');

module.exports = (req, res, next) => {
  const {
    conditions,
    projection,
    sort,
    totalCount,
  } = req;
  const { page, size } = req.pagination;
  Candidate.find(conditions)
    .select(projection)
    .limit(size)
    .skip((page - 1) * size)
    .sort(sort)
    .then(candidates => res.status(200).json({
      total: totalCount,
      page,
      size,
      candidates,
    }))
    .catch(err => next(err));
};
