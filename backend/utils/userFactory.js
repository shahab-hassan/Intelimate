const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

class UserFactory {
  async createUser({ firstName, lastName, username, email, password, confirmPass }) {
    if (!firstName || !username || !email || !password || !confirmPass) {
      throw new Error("All fields are required!");
    }

    if (await userModel.findOne({ username })) {
      throw new Error("Username already taken!");
    }

    if (await userModel.findOne({ email })) {
      throw new Error("Email is already registered!");
    }

    if (password.length < 8) {
      throw new Error("For password, use 8 or more characters with a mix of letters, numbers & symbols!");
    }

    if (password !== confirmPass) {
      throw new Error("Passwords do not match...");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const fullName = `${firstName} ${lastName}`;

    const newUser = await userModel.create({ fullName, username, email, password: hashPassword });

    return newUser;
  }
}

module.exports = new UserFactory();
