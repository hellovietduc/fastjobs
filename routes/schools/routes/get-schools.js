const router = require('express').Router();
const parseQuery = require('../../../middlewares/parse-query');
const { parseProjection, parseSort, parsePagination } = require('../../../utils/query-parsers');
const { parseConditions, sortValues } = require('../utils/query-parsers');
const countDocuments = require('../../../middlewares/count-documents');
const { School } = require('../../../models');
const getSchools = require('../controllers/get-schools');

const parsers = {
  parseConditions,
  parseProjection,
  parseSort,
  parsePagination,
};
const options = { sortValues };

router.get('/', parseQuery(parsers, options), countDocuments(School), getSchools);

module.exports = router;
