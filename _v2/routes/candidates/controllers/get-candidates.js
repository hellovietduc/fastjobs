const Candidate = require('../../../models/account-candidate');

module.exports = (req, res, next) => {
  const {
    conditions, projection, sort, candidateCount,
  } = req;
  const { page, size } = req.pagination;

  Candidate.find(conditions)
    .select(projection)
    .limit(size)
    .skip((page - 1) * size)
    .sort(sort)
    .then(candidates => res.status(200).json({
      _total: candidateCount,
      _page: page,
      _size: size,
      candidates,
    }))
    .catch(err => next(err));
};
