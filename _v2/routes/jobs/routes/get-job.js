const router = require('express').Router();
const parseQuery = require('../middlewares/parse-query');
const replaceSlugs = require('../middlewares/replace-slugs');
const getJob = require('../controllers/get-job');

const parserOptions = { projection: true };

router.get('/:id', parseQuery(parserOptions), replaceSlugs, getJob);

module.exports = router;
