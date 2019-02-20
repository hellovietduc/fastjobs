const router = require('express').Router();
const { parseEmail } = require('../../../middlewares/parse-update');
const markUserUnverified = require('../../../middlewares/mark-user-unverified');
const updateEmployer = require('../controllers/update-employer');

router.put('/:id/email', parseEmail, markUserUnverified, updateEmployer);

module.exports = router;
