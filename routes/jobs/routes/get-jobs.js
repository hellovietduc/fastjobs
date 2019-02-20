const router = require('express').Router();
const parseQuery = require('../../../middlewares/parse-query');
const { parseProjection, parseSort, parsePagination } = require('../../../utils/query-parsers');
const { parseConditions, sortValues } = require('../utils/query-parsers');
const replaceSlugs = require('../middlewares/replace-slugs');
const countDocuments = require('../../../middlewares/count-documents');
const { Job } = require('../../../models');
const getJobs = require('../controllers/get-jobs');

const parsers = {
  parseConditions,
  parseProjection,
  parseSort: query => parseSort(query, sortValues).replace('salary', 'salary.high'),
  parsePagination,
};
const options = { sortValues };

router.get('/', parseQuery(parsers, options), replaceSlugs, countDocuments(Job), getJobs);

module.exports = router;
