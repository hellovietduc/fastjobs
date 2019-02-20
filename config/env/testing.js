module.exports = {
  environment: 'testing',
  mongodb: {
    dbname: process.env.MONGODB_DBNAME_TEST,
  },
  tasksConfig: {
    slugsSyncInterval: 60 * 1000,
  },
};
