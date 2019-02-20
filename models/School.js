const { ObjectId } = require('mongoose').Schema.Types;
const { Address, Major } = require('./child-schemas');
const { ProfileStatuses } = require('./enums/common');
const validators = require('./validators');
const schemaOptions = require('./schema-options/global');

module.exports = {
  collection: 'schools',
  schema: {
    slug: { type: String, required: true },
    profile_status: { type: String, enum: ProfileStatuses, default: 'auto-generated' },
    name: { type: String, minlength: 10, required: true },
    abbr_name: String,
    founded_year: Number,
    addresses: [Address],
    faculties: [{ type: String, trim: true }],
    majors: [Major],
    summary: { type: String, minlength: 100 },
    website: String,
    email: { type: String, validate: validators.email },
    files: {
      logo: ObjectId,
      school_photos: [ObjectId],
    },
    __v: { type: Number, select: false },
  },
  options: schemaOptions,
};
