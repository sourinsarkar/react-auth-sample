const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  info: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  verificationToken: {
    type: String,
  },
  passwordResetToken: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  signedIn: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
