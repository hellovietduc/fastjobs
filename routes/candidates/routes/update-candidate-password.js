const router = require('express').Router();
const { parsePassword } = require('../../../middlewares/parse-update');
const replaceSlugs = require('../middlewares/replace-slugs');
const updateCandidate = require('../controllers/update-candidate');

router.put('/:id/password', parsePassword, replaceSlugs, updateCandidate);

module.exports = router;
