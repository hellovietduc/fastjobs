const schemaOptions = require('../schema-options/child');

module.exports = {
  schema: {
    name: {
      type: String,
      required: function isNameRequired() {
        return this.faculty;
      },
    },
    faculty: String,
  },
  options: schemaOptions,
};
