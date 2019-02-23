const router = require('express').Router();
const { parsePassword } = require('../../../middlewares/parse-update');
const updateEmployer = require('../controllers/update-employer');

router.put('/:id/password', parsePassword, updateEmployer);

module.exports = router;
