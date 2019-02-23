const { School } = require('../../../models');

module.exports = (req, res, next) => {
  const {
    conditions,
    projection,
    sort,
    totalCount,
  } = req;
  const { page, size } = req.pagination;
  School.find(conditions)
    .select(projection)
    .limit(size)
    .skip((page - 1) * size)
    .sort(sort)
    .then(schools => res.status(200).json({
      total: totalCount,
      page,
      size,
      schools,
    }))
    .catch(err => next(err));
};
