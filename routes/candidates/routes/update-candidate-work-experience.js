const router = require('express').Router();
const { parseInsertWorkExperience, parseRemoveWorkExperience } = require('../middlewares/parse-update');
const replaceSlugs = require('../middlewares/replace-slugs');
const updateCandidate = require('../controllers/update-candidate');
const deleteCandidateWorkExperience = require('../controllers/delete-candidate-work-experience');

router.post('/:id/work_experience', parseInsertWorkExperience, replaceSlugs, updateCandidate);

router.delete('/:id/work_experience/:company_id', parseRemoveWorkExperience, replaceSlugs, deleteCandidateWorkExperience);

router.delete('/:id/work_experience', parseRemoveWorkExperience, replaceSlugs, deleteCandidateWorkExperience);

module.exports = router;
