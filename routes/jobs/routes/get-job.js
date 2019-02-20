const router = require('express').Router();
const parseQuery = require('../../../middlewares/parse-query');
const { parseProjection } = require('../../../utils/query-parsers');
const replaceSlugs = require('../middlewares/replace-slugs');
const getJob = require('../controllers/get-job');

const parsers = { parseProjection };

router.get('/:id', parseQuery(parsers), replaceSlugs, getJob);

module.exports = router;
