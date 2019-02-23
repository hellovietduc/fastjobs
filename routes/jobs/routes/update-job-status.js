const router = require('express').Router();
const { parseJobStatus } = require('../middlewares/parse-update');
const replaceSlugs = require('../middlewares/replace-slugs');
const updateJob = require('../controllers/update-job');

router.put('/:id/status', parseJobStatus, replaceSlugs, updateJob);

module.exports = router;
