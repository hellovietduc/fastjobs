const router = require('express').Router();
const parseCreate = require('../middlewares/parse-create');
const createJob = require('../controllers/create-job');

router.post('/', parseCreate, createJob);

module.exports = router;
