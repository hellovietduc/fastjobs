const Candidate = require('../../models/account-candidate');
const Employer = require('../../models/account-employer');
const Job = require('../../models/job');
const Cities = require('./cities');
const { slugify } = require('../../../utils/string');
const { replaceHash } = require('../../../utils/redis');

const syncSlugs = (source, dest) => {
  const slugs = source.reduce((previous, current) => [
    ...previous,
    current._slug,
    current._id.toString(),
  ], []);
  return replaceHash(slugs, dest);
};

const syncArray = (source, dest) => {
  const slugs = source.reduce((previous, current) => [
    ...previous,
    slugify(current),
    current,
  ], []);
  return replaceHash(slugs, dest);
};

module.exports = () => {
  Candidate.find()
    .select('_slug')
    .then(candidates => (candidates.length > 0 ? syncSlugs(candidates, 'candidate-slugs') : 0))
    .catch(err => {});

  Employer.find()
    .select('_slug')
    .then(employers => (employers.length > 0 ? syncSlugs(employers, 'employer-slugs') : 0))
    .catch(err => {});

  Job.find()
    .select('_slug')
    .then(jobs => (jobs.length > 0 ? syncSlugs(jobs, 'job-slugs') : 0))
    .catch(err => {});

  Job.find()
    .select('industries')
    .then(jobs => jobs.reduce((industries, job) => {
      job.industries.forEach((industry) => {
        if (!industries.includes(industry)) industries.push(industry);
      });
      return industries;
    }, []))
    .then(industries => (industries.length > 0 ? syncArray(industries, 'industry-slugs') : 0))
    .catch(err => {});

  syncArray(Cities, 'location-slugs')
    .catch(err => {});
};
