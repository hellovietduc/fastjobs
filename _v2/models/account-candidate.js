const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const candidateSchema = new mongoose.Schema({
  phone_number: {
    value: { type: String, required: true, select: false },
    is_confirmed: { type: Boolean, default: false, select: false },
  },
  email: { type: String, select: false },
  password: { type: String, required: true, select: false },
  name: {
    first: { type: String, select: false },
    last: { type: String, select: false },
    full: String,
  },
  gender: { type: String, enum: ['Nam', 'Nữ'] },
  date_of_birth: String,
  date_of_birth_raw: { type: Date, select: false },
  location: {
    city: String,
    address: String,
    work_locations: [String],
  },
  job_title: String,
  industries: [String],
  desire: {
    position: String,
    salary: String,
    benefits: [String],
  },
  job_goals: {
    list: [String],
    more: String,
  },
  qualification: {
    academic_level: String,
    list: [{
      school: String,
      major: String,
      degree_title: String,
      rank: String,
      start_time: Date,
      end_time: Date,
      achievements: [String],
    }],
  },
  work_experience: {
    label: String,
    exp: { type: Number, select: false },
    list: [{
      company: String,
      job_title: String,
      start_time: Date,
      end_time: Date,
      description: String,
      achievements: [String],
    }],
  },
  skills: {
    tags: [String], // works like tags in stack overflow, anyone can create skill tags
    more: String,
  },
  foreign_languages: [{
    language: String,
    level: String,
  }],
  _slug: String,
  _access_token: { type: String, select: false },
  _is_resume_visible: { type: Boolean, default: true, select: false },
  _views: {
    count: { type: Number, default: 0 },
    employers_seen: { type: [ObjectId], select: false },
  },
  _photos: {
    profile: String,
    cover: String,
  },
  _external_files: {
    resume: String,
  },
  _created_at: Date,
  _updated_at: Date,
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('v2_account_candidate', candidateSchema);
