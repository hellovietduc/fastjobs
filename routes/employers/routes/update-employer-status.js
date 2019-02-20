const router = require('express').Router();
const { parseUserStatus } = require('../../../middlewares/parse-update');
const updateEmployer = require('../controllers/update-employer');

router.put('/:id/user_status', parseUserStatus, updateEmployer);

module.exports = router;
