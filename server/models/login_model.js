const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hashSync(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  console.log(password, this.password);

  return await bcrypt.compare(password, this.password);
};

userSchema.methods.accessToken = async function () {
    console.log("hello");

    return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.access_token_secret,
    {
      expiresIn: process.env.access_token_expiry,
    }
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
