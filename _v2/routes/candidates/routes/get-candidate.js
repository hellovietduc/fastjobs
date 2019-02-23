const router = require('express').Router();
const parseQuery = require('../middlewares/parse-query');
const replaceSlugs = require('../middlewares/replace-slugs');
const getCandidate = require('../controllers/get-candidate');

const parserOptions = { projection: true };

router.get('/:id', parseQuery(parserOptions), replaceSlugs, getCandidate);

module.exports = router;
