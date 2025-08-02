const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    job: {
        type: String,
        required: true,
        maxlength: 50
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);