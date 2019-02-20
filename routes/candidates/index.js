const router = require('express').Router();
const authorize = require('../../middlewares/authorize');

router
  .use(require('./routes/get-candidates'))
  .use(require('./routes/get-candidate'))
  .use(require('./routes/create-candidate'));

router
  .use(authorize)
  .use(require('./routes/update-candidate'))
  .use(require('./routes/update-candidate-status'))
  .use(require('./routes/update-candidate-phone-number'))
  .use(require('./routes/update-candidate-email'))
  .use(require('./routes/update-candidate-password'))
  .use(require('./routes/update-candidate-education'))
  .use(require('./routes/update-candidate-work-experience'))
  .use(require('./routes/delete-candidate'));

module.exports = router;
