const router = require('express').Router();
const { parseInsertEducation, parseRemoveEducation } = require('../middlewares/parse-update');
const replaceSlugs = require('../middlewares/replace-slugs');
const updateCandidate = require('../controllers/update-candidate');
const deleteCandidateEducation = require('../controllers/delete-candidate-education');

router.post('/:id/education', parseInsertEducation, replaceSlugs, updateCandidate);

router.delete('/:id/education/:school_id', parseRemoveEducation, replaceSlugs, deleteCandidateEducation);

router.delete('/:id/education', parseRemoveEducation, replaceSlugs, deleteCandidateEducation);

module.exports = router;
