require('dotenv').config();

const getEnvVariable = (key) => {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`);
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
};

module.exports = getEnvVariable;
