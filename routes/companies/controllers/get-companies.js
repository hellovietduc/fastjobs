const { Company } = require('../../../models');

module.exports = (req, res, next) => {
  const {
    conditions,
    projection,
    sort,
    totalCount,
  } = req;
  const { page, size } = req.pagination;
  Company.find(conditions)
    .select(projection)
    .limit(size)
    .skip((page - 1) * size)
    .sort(sort)
    .then(companies => res.status(200).json({
      total: totalCount,
      page,
      size,
      companies,
    }))
    .catch(err => next(err));
};
