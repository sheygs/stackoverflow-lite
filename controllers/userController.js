const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const catchAsync = require('../utils/async');

const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ status: 'error', error: 'All fields are required' });
  }
  let user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ status: 'error', error: 'User Already exists' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  user = new User({
    name,
    email,
    password: hashed,
  });
  await user.save();
  const token = user.generateAuthToken();
  res.status(201).json({
    status: 'success',
    data: {
      name: user.name,
      email: user.email,
      token,
    },
  });
});

const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: 'error', error: 'All fields are required' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ status: 'error', error: 'Invalid Email' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ status: 'error', error: 'Invalid Password' });
  }
  const token = user.generateAuthToken();
  res.status(400).json({ status: 'success', data: { token } });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const { search } = req.query;
  let users = await User.find().select('-password -__v');
  if (search) {
    // case insensitive search
    users = await User.find({
      name: {
        $regex: new RegExp('^' + search.toLowerCase(), 'i'),
      },
    }).select('-password -__v');

    if (users.length === 0) {
      return res.status(404).json({
        status: false,
        results: users.length,
        message: 'User not found',
      });
    }
  } else if (search === '') {
    return res.status(400).json({
      status: 'error',
      message: 'Value not set',
    });
  }
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

module.exports = {
  signUp,
  signIn,
  getAllUsers,
};
