const Answer = require('../models/answerModel');
const Question = require('../models/questionModel');
const catchAsync = require('../utils/async');
const ObjectId = require('mongoose').Types.ObjectId;

// GET /answers
const getAllAnswers = catchAsync(async (req, res, next) => {
  const answers = await Answer.find()
    .populate('question', '-__v ')
    .populate('answeredBy', '-password -__v -email')
    .select('-__v');
  res
    .status(200)
    .json({ status: 'success', results: answers.length, data: answers });
});

// GET /questions:/id/answers
const getAllAnswersFromQuestion = catchAsync(async (req, res, next) => {
  const { questionId } = req.params;

  if (!ObjectId.isValid(questionId)) {
    return res
      .status(400)
      .json({ status: 'error', error: 'Invalid Question ID' });
  }
  const question = await Question.findById(questionId);

  if (!question) {
    return res.status(404).json({
      status: 'error',
      error: 'Question with the given ID not found',
    });
  }
  const answers = await Answer.find({
    question: question._id,
  }).populate('question', '-__v');

  res.status(200).json({
    results: answers.length,
    status: 'success',
    data: answers,
  });
});

// POST /questions/:id/answers
const createAnswer = catchAsync(async (req, res, next) => {
  const { answer } = req.body;
  const { _id } = req.user;
  const { questionId } = req.params;

  if (!ObjectId.isValid(questionId)) {
    return res
      .status(400)
      .json({ status: 'error', error: 'Invalid Question ID' });
  }
  const question = await Question.findById(questionId);

  if (!question) {
    return res.status(404).json({
      status: 'error',
      error: 'Question with the given ID not found',
    });
  }
  if (!answer) {
    return res.status(400).json({
      status: 'error',
      error: 'Field is required',
    });
  }
  let newAnswer = new Answer({
    answer,
    question: questionId,
    answeredBy: _id,
  });
  newAnswer = await newAnswer.save();

  res.status(201).json({
    status: 'success',
    data: newAnswer,
  });
});

module.exports = {
  getAllAnswers,
  createAnswer,
  getAllAnswersFromQuestion,
};
