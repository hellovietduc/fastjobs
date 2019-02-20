const { ObjectId } = require('mongoose').Schema.Types;
const { Address } = require('./child-schemas');
const { UserStatuses, Genders, Positions } = require('./enums/common');
const validators = require('./validators');
const schemaOptions = require('./schema-options/global');

module.exports = {
  collection: 'account_employers',
  schema: {
    user_status: { type: String, enum: UserStatuses, default: 'new_user' },
    email: { type: String, validate: validators.email, required: true },
    phone_number: { type: String, validate: validators.mobilePhone },
    password: { type: String, required: true },
    name: { type: String, minlength: 5, required: true },
    gender: { type: String, enum: Genders },
    date_of_birth: Date,
    address: Address,
    company_id: ObjectId,
    position: { type: String, enum: Positions },
    files: {
      profile_photo: ObjectId,
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
