const router = require('express').Router();
const candidateRoute = require('./candidates');
const employerRoute = require('./employers');
const jobRoute = require('./jobs');

router.use('/candidates', candidateRoute);
router.use('/employers', employerRoute);
router.use('/jobs', jobRoute);

module.exports = router;
