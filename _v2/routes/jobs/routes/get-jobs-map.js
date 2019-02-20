const router = require('express').Router();
const parseQuery = require('../middlewares/parse-query');
const replaceSlugs = require('../middlewares/replace-slugs');
const getJobsMap = require('../controllers/get-jobs-map');

const parserOptions = {
  conditions: true,
  projection: true,
  map: true,
};

router.get('/_map', parseQuery(parserOptions), replaceSlugs, getJobsMap);

module.exports = router;
