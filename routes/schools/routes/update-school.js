const router = require('express').Router();
const { parseUpdate } = require('../middlewares/parse-update');
const replaceSlugs = require('../middlewares/replace-slugs');
const updateSchool = require('../controllers/update-school');

router.patch('/:id', parseUpdate, replaceSlugs, updateSchool);

module.exports = router;
