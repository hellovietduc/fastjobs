const router = require('express').Router();
const parseCreate = require('../middlewares/parse-create');
const createCompany = require('../controllers/create-company');

router.post('/', parseCreate, createCompany);

module.exports = router;
