const schemaOptions = require('../schema-options/child');

module.exports = {
  schema: {
    skill: {
      type: String,
      required: function isSkillRequired() {
        return this.rating;
      },
    },
    rating: { type: Number, min: 0, max: 5 },
  },
  options: schemaOptions,
};
