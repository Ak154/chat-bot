const User = require("../models/Users");

exports.userRegister = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(409)
        .send({ message: "User already exist", success: false });
    }

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

exports.userLogin = async (req, res) => {};
