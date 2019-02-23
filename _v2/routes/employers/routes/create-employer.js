const router = require('express').Router();
const validateCreate = require('../middlewares/validate-create');
const createEmployer = require('../controllers/create-employer');

router.post('/', validateCreate, createEmployer);

module.exports = router;
