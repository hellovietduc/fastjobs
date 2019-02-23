const router = require('express').Router();
const authenticate = require('../../../middlewares/authenticate');
const createToken = require('../controllers/create-token');

router.post('/', authenticate, createToken);

module.exports = router;
