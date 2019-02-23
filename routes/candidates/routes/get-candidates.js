const router = require('express').Router();
const parseQuery = require('../../../middlewares/parse-query');
const { parseProjection, parseSort, parsePagination } = require('../../../utils/query-parsers');
const { parseConditions, sortValues } = require('../utils/query-parsers');
const replaceSlugs = require('../middlewares/replace-slugs');
const countDocuments = require('../../../middlewares/count-documents');
const { Candidate } = require('../../../models');
const getCandidates = require('../controllers/get-candidates');

const parsers = {
  parseConditions,
  parseProjection,
  parseSort,
  parsePagination,
};
const options = { sortValues };

router.get('/', parseQuery(parsers, options), replaceSlugs, countDocuments(Candidate), getCandidates);

module.exports = router;
