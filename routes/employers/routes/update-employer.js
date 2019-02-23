const router = require('express').Router();
const { parseUpdate } = require('../middlewares/parse-update');
const updateEmployer = require('../controllers/update-employer');

router.patch('/:id', parseUpdate, updateEmployer);

module.exports = router;
