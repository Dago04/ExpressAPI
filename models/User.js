const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true, min: 0 },
    phoneNumber: { type: String, },
    userDescription: { type: String, maxlength: 500 },
    job: { type: String, required: true, maxlength: 100 },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: 10,
    },
    password: {
      type: String,
      required: true,
    },
    profile: profileSchema,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
