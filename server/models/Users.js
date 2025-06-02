const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema("usersModel", {
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
