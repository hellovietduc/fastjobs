const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  industries: { type: [String], required: true },
  locations: { type: [String], required: true },
  salary: {
    max: { type: Number, required: true, select: false },
    min: { type: Number, required: true, select: false },
    label: { type: String, required: true },
    long_label: { type: String, required: true },
    has_bonus: { type: Boolean, default: false },
  },
  work_type: { type: String, required: true },
  position: { type: String, required: true },
  quantity: { type: Number, required: true },
  deadline: { type: String, required: true },
  deadline_raw: { type: Date, required: true, select: false },
  description: { type: String, required: true },
  benefit: {
    list: [String], // benefit badges like vietnamworks, matched to candidate.desire.benefits
    more: String,
  },
  requirements: {
    exp: { type: Number, select: false },
    experience: String,
    academic_level: String,
    skills: [String], // skill tags
    foreign_languages: [String],
    gender: String,
    more: String,
  },
  contact_info: {
    name: String,
    phone_number: { type: String },
    email: { type: String },
  },
  employer: {
    _id: { type: ObjectId, required: true },
    name: String,
    address: String,
    city: String,
    size: String,
    _slug: { type: String, required: true },
    _logo: String,
  },
  geo_location: {
    type: {
      type: String, enum: ['Point'], default: 'Point', select: false,
    },
    coordinates: [Number],
  },
  _slug: { type: String, required: true },
  _status: {
    type: String, enum: ['approving', 'approved', 'rejected'], default: 'approving', select: false,
  },
  _views: { type: Number, default: 0 },
  _created_at: Date,
  _updated_at: Date,
  __v: { type: Number, select: false },
});

jobSchema.index({ geo_location: '2dsphere' });

module.exports = mongoose.model('v2_job', jobSchema);
