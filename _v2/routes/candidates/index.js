const router = require('express').Router();

router.use(require('./routes/get-candidates'));
router.use(require('./routes/get-candidate'));
router.use(require('./routes/create-candidate'));

module.exports = router;
