const router = require('express').Router();
const authorize = require('../../middlewares/authorize');

router
  .use(require('./routes/get-employer'))
  .use(require('./routes/create-employer'));

router
  .use(authorize)
  .use(require('./routes/update-employer'))
  .use(require('./routes/update-employer-status'))
  .use(require('./routes/update-employer-email'))
  .use(require('./routes/update-employer-phone-number'))
  .use(require('./routes/update-employer-password'))
  .use(require('./routes/update-employer-company'))
  .use(require('./routes/delete-employer'));

module.exports = router;
