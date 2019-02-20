const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const employerSchema = new mongoose.Schema({
  email: {
    value: { type: String, required: true, select: false },
    is_confirmed: { type: Boolean, default: false, select: false },
  },
  password: { type: String, required: true, select: false },
  company_info: {
    name: String,
    tax_number: String,
    city: String,
    address: String,
    size: String,
    description: String,
    phone_number: String,
    fax_number: String,
    website: String,
  },
  contact_info: {
    name: String,
    position: String,
    phone_number: String,
  },
  _posted_jobs: { type: [ObjectId], select: false },
  _slug: String,
  _access_token: { type: String, select: false },
  _photos: {
    logo: String,
    cover: String,
  },
  _external_files: {
    business_license: String,
  },
  _created_at: Date,
  _updated_at: Date,
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('v2_account_employer', employerSchema);
