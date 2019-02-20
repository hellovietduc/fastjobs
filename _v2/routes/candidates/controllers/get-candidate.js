const Candidate = require('../../../models/account-candidate');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const { projection } = req;

  Candidate.findById(id)
    .select(projection)
    .then((candidate) => {
      if (candidate) res.status(200).json({ candidate });
      else res.status(404).end();
    })
    .catch(err => next(err));
};
