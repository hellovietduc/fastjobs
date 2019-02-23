const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const supporterSchema = new mongoose.Schema({
    phone_number: {
        value:        { type: String, required: true, unique: true }, // validate
        is_confirmed: { type: Boolean, default: false, select: false }
    },
    email: { type: String }, // validate
    password: { type: String, required: true, select: false },
    name: { type: String, required: true },
    gender: { type: String, enum: ['Nam', 'Nữ'] },
    _access_token: { type: String, required: true, select: false },
    _photos: {
        profile: String // default to something
    },
    __v: { type: Number, select: false },

    // review below properties later
    _work_history: {
        type: [{
            _user_id: ObjectId,
            _call_id: String
        }],
        select: false
    },
    _user_reviews: {
        type: [{
            _user_id:    ObjectId,
            _created_at: Date,
            comment:     String,
            rating:      Number
        }],
        select: false
    }
});

module.exports = mongoose.model('v1_account_supporter', supporterSchema);
