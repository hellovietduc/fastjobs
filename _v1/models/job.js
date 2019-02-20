const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    industries: { type: [String], required: true },
    locations: { type: [String], required: true },
    salary: {
        max:       { type: Number, required: true },
        min:       { type: Number, required: true },
        has_bonus: { type: Boolean, default: false }
    },
    work_type: { type: String, required: true },
    position: { type: String, required: true },
    number_of_positions: { type: Number, required: true },
    closing_date: { type: Date, required: true },
    description: { type: String, required: true },
    benefit: {
        list: [String], // benefit badges like vietnamworks, matched to candidate.desire.benefit
        more:  String
    },
    requirements: {
        experience:        String,
        academic_level:    String,
        skills:           [String], // skill tags
        foreign_language: [String],
        gender:            String,
        more:              String
    },
    contact_info: {
        name:         String,
        phone_number: { type: String }, // validate
        email:        { type: String } // validate
    },
    employer: {
        _id: { type: ObjectId, required: true },
        name: String,
        address: String,
        city: String,
        _logo: String,
        _coords: {
            lat: Number,
            lng: Number
        }
    },
    _status: { type: String, enum: ['approving', 'approved', 'rejected'], default: 'approving', select: false },
    _views: { type: Number, default: 0 },
    _updated_at: Date,
    __v: { type: Number, select: false }
});

module.exports = mongoose.model('v1_job', jobSchema);
