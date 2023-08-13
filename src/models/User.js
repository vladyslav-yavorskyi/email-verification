const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      validate: {
        validator: (username) => User.doesNotExist({ username }),
        message: 'Username already exist.',
      },
    },
    email: {
      type: String,
      validate: {
        validator: (email) => User.doesNotExist({ email }),
        message: 'Email already exists.',
      },
    },
    password: {
      type: String,
      required: true,
    },
    isVerificated: {
      type: Boolean,
    },
    verificationToken: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
