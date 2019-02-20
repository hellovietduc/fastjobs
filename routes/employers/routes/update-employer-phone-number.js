const router = require('express').Router();
const { parsePhoneNumber } = require('../../../middlewares/parse-update');
const updateEmployer = require('../controllers/update-employer');

router.put('/:id/phone_number', parsePhoneNumber, updateEmployer);

module.exports = router;
