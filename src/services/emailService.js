const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'jamar55@ethereal.email',
    pass: 'H5dYpmNYtmXby7h4kN',
  },
});

const sendVefiricationCode = async (email, link) => {
  const message = {
    from: 'noreply@myapp.com',
    to: `${email}`,
    subject: 'Your verification code',
    text: `Hi, this is your verification link: ${link}`,
  };

  await transporter.sendMail(message);
};

module.exports = sendVefiricationCode;
