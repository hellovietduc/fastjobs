const router = require('express').Router();
const getEmployer = require('../controllers/get-employer');

router.get('/:id', getEmployer);

module.exports = router;
