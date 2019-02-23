const router = require('express').Router();
const authorize = require('../../middlewares/authorize');

router
  .use(require('./routes/get-companies'))
  .use(require('./routes/get-company'));

router
  .use(authorize)
  .use(require('./routes/create-company'))
  .use(require('./routes/update-company'));

module.exports = router;
