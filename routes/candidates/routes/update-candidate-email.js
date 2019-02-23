const router = require('express').Router();
const { parseEmail } = require('../../../middlewares/parse-update');
const replaceSlugs = require('../middlewares/replace-slugs');
const updateCandidate = require('../controllers/update-candidate');

router.put('/:id/email', parseEmail, replaceSlugs, updateCandidate);

module.exports = router;
