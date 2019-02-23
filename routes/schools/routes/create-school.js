const router = require('express').Router();
const parseCreate = require('../middlewares/parse-create');
const createSchool = require('../controllers/create-school');

router.post('/', parseCreate, createSchool);

module.exports = router;
