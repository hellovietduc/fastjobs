const router = require('express').Router();
const validateCreate = require('../middlewares/validate-create');
const createCandidate = require('../controllers/create-candidate');

router.post('/', validateCreate, createCandidate);

module.exports = router;
