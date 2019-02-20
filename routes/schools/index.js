const router = require('express').Router();
const authorize = require('../../middlewares/authorize');

router
  .use(require('./routes/get-schools'))
  .use(require('./routes/get-school'));

router
  .use(authorize)
  .use(require('./routes/create-school'))
  .use(require('./routes/update-school'));

module.exports = router;
