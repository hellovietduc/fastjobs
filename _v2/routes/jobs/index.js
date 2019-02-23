const router = require('express').Router();

router.use(require('./routes/get-jobs'));
router.use(require('./routes/get-jobs-map'));
router.use(require('./routes/get-job'));

module.exports = router;
