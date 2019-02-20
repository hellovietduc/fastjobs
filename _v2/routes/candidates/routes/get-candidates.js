const router = require('express').Router();
const parseQuery = require('../middlewares/parse-query');
const replaceSlugs = require('../middlewares/replace-slugs');
const countCandidates = require('../middlewares/count-candidates');
const getCandidates = require('../controllers/get-candidates');

const parserOptions = {
  conditions: true,
  projection: true,
  sort: true,
  pagination: true,
};

router.get('/', parseQuery(parserOptions), replaceSlugs, countCandidates, getCandidates);

module.exports = router;
