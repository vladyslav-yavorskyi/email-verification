const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const generateVerificationCode = require('./src/utils/jwtUtils');
const sendVefiricationCode = require('./src/services/emailService');
const authRouter = require('./src/routes/authRoutes');
const getEnvVariable = require('./src/utils/getEnvVariable');

const app = express();
const dbURI = getEnvVariable('dbURI');
const PORT = 3000;

(async () => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(dbURI, { useNewUrlParser: true });
    console.log('MongoDB connected 🔥');

    // hide from hackers what stack we use
    app.disable('x-powered-by');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/api', authRouter);

    app.listen(PORT, () => {
      console.log(`Listening http://localhost:${PORT}`);
    });
  } catch (error) {
    throw error;
  }
})();
