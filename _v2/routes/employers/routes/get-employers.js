const router = require('express').Router();
const parseQuery = require('../middlewares/parse-query');
const replaceSlugs = require('../middlewares/replace-slugs');
const countEmployers = require('../middlewares/count-employers');
const getEmployers = require('../controllers/get-employers');

const parserOptions = {
  conditions: true,
  projection: true,
  sort: true,
  pagination: true,
};

router.get('/', parseQuery(parserOptions), replaceSlugs, countEmployers, getEmployers);

module.exports = router;
