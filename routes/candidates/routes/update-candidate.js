const router = require('express').Router();
const { parseUpdate } = require('../middlewares/parse-update');
const replaceSlugs = require('../middlewares/replace-slugs');
const updateCandidate = require('../controllers/update-candidate');

router.patch('/:id', parseUpdate, replaceSlugs, updateCandidate);

module.exports = router;
