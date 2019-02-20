const Job = require('../../../models/job');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const { projection } = req;

  Job.findById(id)
    .select(projection)
    .then((job) => {
      if (job) res.status(200).json({ job });
      else res.status(404).end();
    })
    .catch(err => next(err));
};
