const { ObjectId } = require('mongoose').Schema.Types;
const { Address } = require('./child-schemas');
const { ProfileStatuses, Industries } = require('./enums/common');
const { Sizes } = require('./enums/company');
const validators = require('./validators');
const schemaOptions = require('./schema-options/global');

module.exports = {
  collection: 'companies',
  schema: {
    slug: { type: String, required: true },
    profile_status: { type: String, enum: ProfileStatuses, default: 'auto-generated' },
    name: { type: String, minlength: 10, required: true },
    abbr_name: String,
    founded_year: Number,
    addresses: [Address],
    industries: [{ type: String, enum: Industries }],
    size: { type: String, enum: Sizes },
    summary: { type: String, minlength: 100 },
    website: String,
    email: { type: String, validate: validators.email },
    files: {
      logo: ObjectId,
      company_photos: [ObjectId],
    },
    __v: { type: Number, select: false },
  },
  options: schemaOptions,
};
