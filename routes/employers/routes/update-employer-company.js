const router = require('express').Router();
const { parseUpsertCompany, parseRemoveCompany } = require('../middlewares/parse-update');
const updateEmployer = require('../controllers/update-employer');

router.put('/:id/company', parseUpsertCompany, updateEmployer);

router.delete('/:id/company', parseRemoveCompany, updateEmployer);

module.exports = router;
