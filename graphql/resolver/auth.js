const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = (await User.findOne({ email: args.userInput.email }));

      if (existingUser) {
        throw new Error('User already exists!');
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const userResult = await user.save();

      return {
        ...userResult._doc,
        password: null,
        _id: userResult.id
      };
    } catch (error) {
      throw error;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User doest not exist!');
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, 'supersecretkey', { expiresIn: '1h' });

    return {
      userId: user.id,
      token,
      tokenExpiration: 1
    };
  }
};
