const schemaOptions = require('../schema-options/child');

module.exports = {
  schema: {
    language: {
      type: String,
      required: function isLanguageRequired() {
        return this.rating;
      },
    },
    rating: { type: Number, min: 0, max: 5 },
  },
  options: schemaOptions,
};
