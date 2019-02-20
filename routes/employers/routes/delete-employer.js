const router = require('express').Router();
const { parseUserStatus } = require('../../../middlewares/parse-update');
const updateEmployer = require('../controllers/update-employer');

router.delete('/:id', parseUserStatus, updateEmployer);

module.exports = router;
