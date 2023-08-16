const mongoose = require('mongoose');
const { compareSync, hashSync } = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

userSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = hashSync(this.password, 10);
  }
});

// custom validator for userSchema; check if user exist or not
userSchema.statics.doesNotExist = async function (field) {
  return (await this.where(field).countDocuments()) === 0;
};

// compare passwords
userSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
