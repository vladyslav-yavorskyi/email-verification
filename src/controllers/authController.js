const User = require('../models/user.js');
const crypto = require('crypto');
const sendVefiricationCode = require('../services/emailService.js');
const Token = require('../models/Token.js');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(409).send('A user already exist');
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();

    await new User({
      username,
      email,
      password,
      verificationCode,
      isVerificated: false,
    }).save();

    await new Token({
      email,
      verificationCode,
    }).save();

    await sendVefiricationCode(
      email,
      `http://localhost:3000/api/verificate/${email}/${verificationCode}`
    );

    res.send('An Email sent to your account please verify');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verificate = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    console.log(email, req.params.token);
    if (!user) return res.status(400).send('Invalid link');

    const token = await Token.findOne({
      email,
      verificationCode: req.params.token,
    });
    if (!token) return res.status(400).send('Invalid link');

    await User.updateOne({ email }, { isVerificated: true });
    await Token.deleteOne({ email });

    res.send('email verified sucessfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, verificate };
