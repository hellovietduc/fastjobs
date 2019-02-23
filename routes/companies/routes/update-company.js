const router = require('express').Router();
const { parseUpdate } = require('../middlewares/parse-update');
const replaceSlugs = require('../middlewares/replace-slugs');
const updateCompany = require('../controllers/update-company');

router.patch('/:id', parseUpdate, replaceSlugs, updateCompany);

module.exports = router;
