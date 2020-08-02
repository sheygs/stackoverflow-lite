const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '6hr',
  });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
