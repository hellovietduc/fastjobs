const passport = require('passport');
const getLocalStrategy = require('./local-strategy');
const getJwtStrategy = require('./jwt-strategy');
const { Candidate, Employer } = require('../../models');

passport.use('local.candidate.phone_number', getLocalStrategy(Candidate, 'phone_number'));
passport.use('local.candidate.email', getLocalStrategy(Candidate, 'email'));
passport.use('local.employer.phone_number', getLocalStrategy(Employer, 'phone_number'));
passport.use('local.employer.email', getLocalStrategy(Employer, 'email'));
passport.use('jwt', getJwtStrategy());

module.exports = passport;
