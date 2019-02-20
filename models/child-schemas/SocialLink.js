const { SocialSites } = require('../enums/candidate');
const schemaOptions = require('../schema-options/child');

module.exports = {
  schema: {
    icon: { type: String, enum: SocialSites },
    url: {
      type: String,
      required: function isUrlRequired() {
        return this.icon;
      },
    },
  },
  options: schemaOptions,
};
