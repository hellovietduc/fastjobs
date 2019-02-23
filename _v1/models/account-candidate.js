const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const candidateSchema = new mongoose.Schema({
    phone_number: {
        value:        { type: String, required: true, unique: true, select: false }, // validate
        is_confirmed: { type: Boolean, default: false, select: false }
    },
    email: { type: String, select: false }, // validate
    password: { type: String, default: 'halujobs', select: false },
    name: {
        first: { type: String, required: true },
        last:  { type: String, required: true }
    },
    gender: { type: String, enum: ['Nam', 'Nữ'] },
    date_of_birth: Date,
    location: {
        nationality:     String,
        city:            String,
        address:         String,
        work_locations: [String]
    },
    job_title: String,
    industries: [String],
    desire: {
        position:  String,
        salary:    String,
        benefit:  [String]
    },
    job_goals: {
        list: [String],
        more:  String
    },
    qualification: {
        academic_level: String,
        list: [{
            school:        String,
            major:         String,
            degree_title:  String,
            rank:          String,
            start_time:    Date,
            end_time:      Date,
            achievements: [String]
        }]
    },
    work_experience: {
        in_years: String,
        list: [{
            company:       String,
            job_title:     String,
            start_time:    Date,
            end_time:      Date,
            description:   String,
            achievements: [String]
        }]
    },
    skills: {
        list: [String], // works like tags in stack overflow, anyone can create skill tags
        more:  String
    },
    foreign_languages: [{
        language: String,
        level:    String,
    }],
    _access_token: { type: String, required: true, select: false },
    _is_resume_visible: { type: Boolean, default: true, select: false },
    _views: {
        count: { type: Number, default: 0 },
        employers_watched: { type: [ObjectId], select: false }
    },
    _photos: {
        profile: String, // default to something
        cover:   String // default to something
    },
    _external_files: {
        resume: String
    },
    _updated_at: Date,
    __v: { type: Number, select: false },

    // review below properties later
    _saved_jobs: {
        type: [{
            _job_id:  ObjectId,
            saved_at: Date,
            category: String,
            note:     String
        }],
        select: false
    },
    _applied_jobs: {
        type: [{
            _job_id:    ObjectId,
            applied_at: Date,
            status:     String
        }],
        select: false
    },
    _company_reviews: {
        type: [{
            _company_id:   ObjectId,
            start_time:    Date,
            end_time:      Date,
            positions:    [String],
            achievements: [String],
            comment:       String,
            rating:        Number
        }],
        select: false
    }
});

candidateSchema.virtual('name.full').get(function () {
    return this.name.last + ' ' + this.name.first;
});

candidateSchema.virtual('location.full_address').get(function () {
    return this.location.address + ', ' + this.location.city;
});

module.exports = mongoose.model('v1_account_candidate', candidateSchema);
