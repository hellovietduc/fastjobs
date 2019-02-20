const router = require('express').Router();
const parseQuery = require('../middlewares/parse-query');
const replaceSlugs = require('../middlewares/replace-slugs');
const getEmployer = require('../controllers/get-employer');

const parserOptions = { projection: true };

router.get('/:id', parseQuery(parserOptions), replaceSlugs, getEmployer);

module.exports = router;
