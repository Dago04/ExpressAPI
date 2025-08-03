const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true, min: 0},
    phoneNumber: {type: String, required: true, match: /^\d{10}$/},
    userDescription: {type: String, required: true, maxlength: 500},
    job: {type: String, required: true, maxlength: 100},
}, {_id:false});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profile: profileSchema
}, {
  timestamps: true
});
module.exports = mongoose.model('User', userSchema);