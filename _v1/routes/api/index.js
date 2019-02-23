const express = require('express');
const candidates = require('./candidates/index');
const employers = require('./employers/index');
const jobs = require('./jobs/index');

const router = express.Router();

router.use('/candidates', candidates);
router.use('/employers', employers);
router.use('/jobs', jobs);

module.exports = router;
