const { ObjectId } = require('mongoose').Schema.Types;
const schemaOptions = require('./schema-options/global');

module.exports = {
  collection: 'account_employers.saved_resumes',
  schema: {
    employer_id: { type: ObjectId, required: true },
    resume_id: { type: ObjectId, required: true },
    category: String,
    name: String,
    job_title: String,
    note: String,
    __v: { type: Number, select: false },
  },
  options: {
    ...schemaOptions,
    timestamps: {
      createdAt: 'saved_date',
    },
  },
};
