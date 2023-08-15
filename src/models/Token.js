const mongoose = require('mongoose');

const emailVerificationTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '10m',
  },
});

const Token = mongoose.model('Token', emailVerificationTokenSchema);

module.exports = Token;
