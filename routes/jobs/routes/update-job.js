const router = require('express').Router();
const { parseUpdate } = require('../middlewares/parse-update');
const replaceSlugs = require('../middlewares/replace-slugs');
const updateJob = require('../controllers/update-job');

router.patch('/:id', parseUpdate, replaceSlugs, updateJob);

module.exports = router;
