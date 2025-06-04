const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(409)
        .send({ message: "User already exist", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    let newUser = new User(req.body);

    await newUser.save();

    res
      .status(201)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server error", success: false, error });
  }
};

exports.userLogin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).send({ message: "Incorrect password", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      res
        .status(200)
        .send({ message: "Log in successfully", success: true, token });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server error", success: false, error });
  }
};

exports.userInfo = async (req, res) => {
  try {
    let userData = await User.findOne({ username: req.body.username });

    if (!userData) {
      return res
        .status(401)
        .send({ message: "User doesn't exist", success: false });
    }
    userData.password = undefined;

    res.status(200).send({
      message: "Your profile fetched successfully",
      success: true,
      data: userData,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server error", succes: false, error });
  }
};
