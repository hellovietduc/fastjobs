const { ObjectId } = require('mongoose').Schema.Types;
const schemaOptions = require('./schema-options/global');

module.exports = {
  collection: 'account_candidates.saved_jobs',
  schema: {
    candidate_id: { type: ObjectId, required: true },
    job_id: { type: ObjectId, required: true },
    category: String,
    job_title: String,
    company: String,
    salary: String,
    deadline: String,
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
