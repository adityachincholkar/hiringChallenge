// backend/controllers/userController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
    });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET);
    res.send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};
