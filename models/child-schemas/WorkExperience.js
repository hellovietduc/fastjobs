const { ObjectId } = require('mongoose').Schema.Types;
const schemaOptions = require('../schema-options/child');

module.exports = {
  schema: {
    company_id: ObjectId,
    company_slug: String,
    company_name: {
      type: String,
      required: function isCompanyNameRequired() {
        return Object.entries(this).some((pair) => {
          const key = pair[0];
          const value = pair[1];
          if (key !== 'company_name') return value;
          return false;
        });
      },
    },
    company_logo: String,
    position: String,
    start_date: Date,
    end_date: Date,
    description: String,
  },
  options: schemaOptions,
};
