const express = require('express');
const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');
const generateVerificationCode = require('./src/utils/jwtUtils');
const sendVefiricationCode = require('./src/services/emailService');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const verificationToken = generateVerificationCode('testemail@test.ts');
  res.send(verificationToken);
});

app.post('/', async (req, res) => {
  const { email, name } = req.body;
  console.log(email, name);

  const info = sendVefiricationCode(email);

  console.log('Message sent: ', info.messageId);
  console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));

  res.send('Email was sent!');
});

app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});
