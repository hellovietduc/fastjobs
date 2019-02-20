const router = require('express').Router();
const parseQuery = require('../../../middlewares/parse-query');
const { parseProjection, parseSort, parsePagination } = require('../../../utils/query-parsers');
const { parseConditions, sortValues } = require('../utils/query-parsers');
const countDocuments = require('../../../middlewares/count-documents');
const { Company } = require('../../../models');
const getCompanies = require('../controllers/get-companies');

const parsers = {
  parseConditions,
  parseProjection,
  parseSort,
  parsePagination,
};
const options = { sortValues };

router.get('/', parseQuery(parsers, options), countDocuments(Company), getCompanies);

module.exports = router;
