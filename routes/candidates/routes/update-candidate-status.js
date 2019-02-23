const router = require('express').Router();
const { parseUserStatus } = require('../../../middlewares/parse-update');
const replaceSlugs = require('../middlewares/replace-slugs');
const updateCandidate = require('../controllers/update-candidate');

router.put('/:id/user_status', parseUserStatus, replaceSlugs, updateCandidate);

module.exports = router;
