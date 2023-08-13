const User = require('../models/user.js');

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingEmail = await User.find({ email });

    if (existingEmail) {
      throw createHttpError(409, 'A user already exist');
    }
  } catch (error) {
    next(error);
  }
};
