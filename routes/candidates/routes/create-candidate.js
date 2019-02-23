const router = require('express').Router();
const parseCreate = require('../middlewares/parse-create');
const createCandidate = require('../controllers/create-candidate');

router.post('/', parseCreate, createCandidate);

module.exports = router;
