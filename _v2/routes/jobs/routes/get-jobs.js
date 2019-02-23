const router = require('express').Router();
const parseQuery = require('../middlewares/parse-query');
const replaceSlugs = require('../middlewares/replace-slugs');
const countJobs = require('../middlewares/count-jobs');
const getJobs = require('../controllers/get-jobs');

const parserOptions = {
  conditions: true,
  projection: true,
  sort: true,
  pagination: true,
};

router.get('/', parseQuery(parserOptions), replaceSlugs, countJobs, getJobs);

module.exports = router;
