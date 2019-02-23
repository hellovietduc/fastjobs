const Employer = require('../../../models/account-employer');

module.exports = (req, res, next) => {
  const {
    conditions, projection, sort, employerCount,
  } = req;
  const { page, size } = req.pagination;

  Employer.find(conditions)
    .select(projection)
    .limit(size)
    .skip((page - 1) * size)
    .sort(sort)
    .then(employers => res.status(200).json({
      _total: employerCount,
      _page: page,
      _size: size,
      employers,
    }))
    .catch(err => next(err));
};
