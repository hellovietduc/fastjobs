const router = require('express').Router();

router.use(require('./routes/get-employers'));
router.use(require('./routes/get-employer'));
router.use(require('./routes/create-employer'));

module.exports = router;
