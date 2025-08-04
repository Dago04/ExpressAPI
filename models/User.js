const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const profileSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true, min: 0 },
    phoneNumber: { type: String },
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
      match: /.+@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 72,
    },
    profile: profileSchema,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // Soporta variantes con y sin $set
  const plainPassword =
    update.password || (update.$set && update.$set.password);
  if (!plainPassword) return next();

  const hashed = await bcrypt.hash(plainPassword, 12);

  if (update.password) update.password = hashed;
  if (update.$set && update.$set.password) update.$set.password = hashed;

  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // evita re-hash innecesario
  this.password = await bcrypt.hash(this.password, 12); // work-factor 12 ≈ producción
  next();
});
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password); // verificación constante-time
};

module.exports = mongoose.model("User", userSchema);
