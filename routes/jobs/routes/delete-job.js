const router = require('express').Router();
const replaceSlugs = require('../middlewares/replace-slugs');
const deleteJob = require('../controllers/delete-job');

router.delete('/:id', replaceSlugs, deleteJob);

module.exports = router;
