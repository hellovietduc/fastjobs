const router = require('express').Router();
const parseQuery = require('../../../middlewares/parse-query');
const { parseProjection } = require('../../../utils/query-parsers');
const replaceSlugs = require('../middlewares/replace-slugs');
const getSchool = require('../controllers/get-school');

const parsers = { parseProjection };

router.get('/:id', parseQuery(parsers), replaceSlugs, getSchool);

module.exports = router;
