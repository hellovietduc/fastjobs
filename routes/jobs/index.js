const router = require('express').Router();
const authorize = require('../../middlewares/authorize');

router
  .use(require('./routes/get-jobs'))
  .use(require('./routes/get-jobs-map'))
  .use(require('./routes/get-job'));

router
  .use(authorize)
  .use(require('./routes/create-job'))
  .use(require('./routes/update-job'))
  .use(require('./routes/update-job-status'))
  .use(require('./routes/delete-job'));

module.exports = router;
