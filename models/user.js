//Schema setup

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
});

User.statics.checkExists = async function (email) {
  return await this.exists({ email });
};

User.statics.checkPassword = async function (email, password) {
  const username = await this.findOne({ email });

  if (!username) {
    return false;
  }
  if (await bcrypt.compare(password, username.password)) {
    return true;
  }
  return false;
};

module.exports = mongoose.model("users", User);
