const { ObjectId } = require('mongoose').Schema.Types;
const { Ranks } = require('../enums/candidate');
const schemaOptions = require('../schema-options/child');

module.exports = {
  schema: {
    school_id: ObjectId,
    school_slug: String,
    school_name: {
      type: String,
      required: function isSchoolNameRequired() {
        return Object.entries(this).some((pair) => {
          const key = pair[0];
          const value = pair[1];
          if (key !== 'school_name') return value;
          return false;
        });
      },
    },
    school_logo: String,
    faculty: String,
    major: String,
    degree: String,
    rank: { type: String, enum: Ranks },
    start_date: Date,
    end_date: Date,
    description: String,
  },
  options: schemaOptions,
};
