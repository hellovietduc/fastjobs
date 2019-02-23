const router = require('express').Router();
const parseCreate = require('../middlewares/parse-create');
const createEmployer = require('../controllers/create-employer');

router.post('/', parseCreate, createEmployer);

module.exports = router;
