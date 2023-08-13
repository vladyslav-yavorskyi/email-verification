const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'turner.bernhard@ethereal.email',
    pass: 'bwEhpAjmu8m1a7SZMF',
  },
});

const sendVefiricationCode = async (email, verificationCode) => {
  const message = {
    from: 'noreply@myapp.com',
    to: `${email}`,
    subject: 'Your verification code',
    text: `Hi, this is your verificationCode ${verificationCode}`,
  };

  await transporter.sendMail({ message });
};

module.exports = sendVefiricationCode;
