const Employer = require('../../../models/account-employer');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const { projection } = req;

  Employer.findById(id)
    .select(projection)
    .then((employer) => {
      if (employer) res.status(200).json({ employer });
      else res.status(404).end();
    })
    .catch(err => next(err));
};
