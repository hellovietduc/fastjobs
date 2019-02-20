const { Cities } = require('../enums/common');
const schemaOptions = require('../schema-options/child');

module.exports = {
  schema: {
    city: {
      type: String,
      enum: Cities,
      required: function isCityRequired() {
        return this.path;
      },
    },
    path: String,
  },
  options: schemaOptions,
};
