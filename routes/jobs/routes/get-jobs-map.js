const router = require('express').Router();
const parseQuery = require('../../../middlewares/parse-query');
const { parseProjection } = require('../../../utils/query-parsers');
const { parseConditions, parseMapConditions, mapProjection } = require('../utils/query-parsers');
const replaceSlugs = require('../middlewares/replace-slugs');
const getJobsMap = require('../controllers/get-jobs-map');

const parsers = {
  parseConditions,
  parseMapConditions,
  parseProjection,
};
const options = { mapProjection };

router.get('/_map', parseQuery(parsers, options), replaceSlugs, getJobsMap);

module.exports = router;
