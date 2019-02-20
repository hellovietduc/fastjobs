/* eslint-disable global-require,no-unused-vars */

const log = require('../config/log');

module.exports = (app) => {
  app.use('/api', require('../_v1/routes/api'));
  app.use('/v2', require('../_v2/routes'));
  app.use('/auth', require('./auth'));
  app.use('/candidates', require('./candidates'));
  app.use('/employers', require('./employers'));
  app.use('/companies', require('./companies'));
  app.use('/schools', require('./schools'));
  app.use('/jobs', require('./jobs'));

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: { message: err.message } });
    if (!err.noLog) log.error(err);
  });
};
