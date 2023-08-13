const jwt = require('jsonwebtoken');
const getEnvVariable = require('./getEnvVariable');

const generateVerificationCode = (email) => {
  const secretKey = getEnvVariable('SECRET');
  const tokenData = {
    email,
    type: 'email-verification',
  };

  const tokenOptions = {
    expiresIn: '10 minutes',
  };

  const token = jwt.sign(tokenData, secretKey, tokenOptions);

  return token;
};

module.exports = generateVerificationCode;
