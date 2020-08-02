const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 15,
    maxlength: 1024,
  },
  body: {
    type: String,
    required: true,
    minlength: 15,
    maxlength: 1024,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
