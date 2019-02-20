const { ObjectId } = require('mongoose').Schema.Types;
const { Address } = require('./child-schemas');
const {
  Industries,
  Positions,
  AcademicLevels,
  Genders,
} = require('./enums/common');
const { Statuses, WorkTypes, Experience } = require('./enums/job');
const validators = require('./validators');
const schemaOptions = require('./schema-options/global');

module.exports = {
  collection: 'jobs',
  schema: {
    slug: { type: String, required: true },
    status: { type: String, enum: Statuses, default: 'approving' },
    company_id: { type: ObjectId, required: true },
    company_slug: { type: String, required: true },
    company_name: { type: String, required: true },
    company_logo: { type: String, required: true },
    views: { type: Number, min: 0, default: 0 },
    title: { type: String, minlength: 10, required: true },
    description: { type: String, minlength: 100, required: true },
    deadline: { type: Date, required: true },
    locations: { type: [Address], required: true },
    geo_location: [Number],
    industries: { type: [{ type: String, enum: Industries }], required: true },
    salary: {
      low: { type: Number, min: 0, required: true },
      high: { type: Number, min: 0, required: true },
    },
    benefits: String,
    work_type: { type: String, enum: WorkTypes, required: true },
    position: { type: String, enum: Positions, required: true },
    quantity: { type: Number, min: 1, default: 1 },
    requirements: {
      experience: { type: String, enum: Experience },
      skills: [String],
      foreign_languages: [String],
      academic_level: { type: String, enum: AcademicLevels },
      gender: { type: String, enum: Genders },
      extra: String,
    },
    contact_info: {
      name: String,
      phone_number: { type: String, validate: validators.mobilePhone },
      email: { type: String, validate: validators.email },
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
  index: {
    geo_location: '2dsphere',
  },
};
