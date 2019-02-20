const router = require('express').Router();
const parseQuery = require('../../../middlewares/parse-query');
const { parseProjection } = require('../../../utils/query-parsers');
const replaceSlugs = require('../middlewares/replace-slugs');
const getCandidate = require('../controllers/get-candidate');

const parsers = { parseProjection };

router.get('/:id', parseQuery(parsers), replaceSlugs, getCandidate);

module.exports = router;
