const { ObjectId } = require('mongoose').Schema.Types;
const { AppliedResumeStatuses } = require('./enums/employer');
const schemaOptions = require('./schema-options/global');

module.exports = {
  collection: 'account_employers.applied_resumes',
  schema: {
    employer_id: { type: ObjectId, required: true },
    status: { type: String, enum: AppliedResumeStatuses, default: 'new_resume' },
    resume_id: { type: ObjectId, required: true },
    category: String,
    name: String,
    job_title: String,
    position: String,
    __v: { type: Number, select: false },
  },
  options: {
    ...schemaOptions,
    timestamps: {
      createdAt: 'applied_date',
    },
  },
};
