const { ObjectId } = require('mongoose').Schema.Types;
const { AppliedJobStatuses } = require('./enums/candidate');
const schemaOptions = require('./schema-options/global');

module.exports = {
  collection: 'account_candidates.applied_jobs',
  schema: {
    candidate_id: { type: ObjectId, required: true },
    status: { type: String, enum: AppliedJobStatuses, default: 'applied' },
    job_id: { type: ObjectId, required: true },
    category: String,
    job_title: String,
    company: String,
    salary: String,
    __v: { type: Number, select: false },
  },
  options: {
    ...schemaOptions,
    timestamps: {
      createdAt: 'applied_date',
    },
  },
};
