const router = require('express').Router();
const { parsePhoneNumber } = require('../../../middlewares/parse-update');
const markUserUnverified = require('../../../middlewares/mark-user-unverified');
const replaceSlugs = require('../middlewares/replace-slugs');
const updateCandidate = require('../controllers/update-candidate');

router.put('/:id/phone_number', parsePhoneNumber, markUserUnverified, replaceSlugs, updateCandidate);

module.exports = router;
