const User = require("../models/User");
const bcrypt = require("bcrypt");
const { BadRequest, UnAuth } = require("../errors");

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  const token = newUser.createJWT();
  res.json({ user: { name: newUser.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide an email and password");
  }

  const userLogin = await User.findOne({ email });

  if (!userLogin) {
    throw new UnAuth("Invalid Credentials");
  }

  const isPasswordCorrect = await userLogin.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuth("Invalid Credentials");
  }

  const token = userLogin.createJWT();
  res.json({ user: { name: userLogin.name }, token });
};

module.exports = { register, login };
