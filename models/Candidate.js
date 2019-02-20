const { ObjectId } = require('mongoose').Schema.Types;
const {
  Address,
  Skill,
  ForeignLanguage,
  Education,
  WorkExperience,
  SocialLink,
} = require('./child-schemas');
const {
  UserStatuses,
  Genders,
  Cities,
  Industries,
  Positions,
  AcademicLevels,
} = require('./enums/common');
const validators = require('./validators');
const schemaOptions = require('./schema-options/global');

module.exports = {
  collection: 'account_candidates',
  schema: {
    slug: { type: String, required: true },
    user_status: { type: String, enum: UserStatuses, default: 'new_user' },
    phone_number: { type: String, validate: validators.mobilePhone, required: true },
    email: { type: String, validate: validators.email },
    password: { type: String, required: true },
    views: { type: Number, min: 0, default: 0 },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    gender: { type: String, enum: Genders },
    date_of_birth: Date,
    address: Address,
    job_title: { type: String, minlength: 10 },
    summary: { type: String, minlength: 100 },
    work_locations: [{ type: String, enum: Cities }],
    industries: [{ type: String, enum: Industries }],
    position: { type: String, enum: Positions },
    expecting_salary: {
      low: { type: Number, min: 0 },
      high: { type: Number, min: 0 },
    },
    skills: [Skill],
    foreign_languages: [ForeignLanguage],
    academic_level: { type: String, enum: AcademicLevels },
    education: [Education],
    experience: { type: Number, min: 0, default: 0 },
    work_experience: [WorkExperience],
    social_links: [SocialLink],
    files: {
      profile_photo: ObjectId,
      cover_photo: ObjectId,
      resume: ObjectId,
    },
    __v: { type: Number, select: false },
  },
  options: {
    ...schemaOptions,
    timestamps: {
      createdAt: 'created_date',
      updatedAt: 'updated_date',
    },
  },
};
