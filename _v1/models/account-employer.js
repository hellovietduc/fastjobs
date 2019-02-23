const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const employerSchema = new mongoose.Schema({
    email: {
        value:        { type: String, required: true, unique: true, select: false }, // validate
        is_confirmed: { type: Boolean, default: false, select: false }
    },
    password: { type: String, default: 'halujobs', select: false },
    company_info: {
        name:         { type: String, required: true },
        tax_number:   { type: String },
        city:         { type: String, required: true },
        address:      { type: String, required: true },
        size:         String,
        description:  String,
        phone_number: { type: String }, // validate
        fax_number:   { type: String },
        website:      String
    },
    contact_info: {
        name:         { type: String, required: true },
        position:     String,
        phone_number: { type: String, required: true } // validate
    },
    posted_jobs: { type: [ObjectId], select: false },
    _access_token: { type: String, required: true, select: false },
    _photos: {
        logo:  String, // default to something
        cover: String // default to something
    },
    _external_files: {
        business_license: String
    },
    _updated_at: Date,
    __v: { type: Number, select: false },

    // review below properties later
    _employee_list: { type: [ObjectId], select: false },
    _saved_resumes: {
        type: [{
            _candidate_id: ObjectId,
            saved_at:      Date,
            category:      String,
            note:          String,
        }],
        select: false
    },
    _applied_resumes: {
        type: [{
            _candidate_id: ObjectId,
            _job_id:       ObjectId,
            applied_at:    Date,
            status:        String,
        }],
        select: false
    },
    _candidate_reviews: {
        type: [{
            _candidate_id: ObjectId,
            start_time:    Date,
            end_time:      Date,
            positions:    [String],
            salary:        String,
            comment:       String,
            rating:        Number,
        }],
        select: false
    }
});

employerSchema.virtual('company_info.full_address').get(function () {
    return this.company_info.address + ', ' + this.company_info.city;
});

module.exports = mongoose.model('v1_account_employer', employerSchema);
