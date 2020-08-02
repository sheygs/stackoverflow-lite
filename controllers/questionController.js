const Question = require('../models/questionModel');
const ObjectId = require('mongoose').Types.ObjectId;
const catchAsync = require('../utils/async');

const createQuestion = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({
      status: 'error',
      error: 'All fields are required',
    });
  }
  let question = new Question({
    title,
    body,
    author: _id,
  });
  question = await question.save();
  res.status(201).json({
    status: 'success',
    data: question,
  });
});

// GET /api/v1/questions?search=q
const getAllQuestions = catchAsync(async (req, res, next) => {
  const { search } = req.query;

  let questions = await Question.find()
    .populate('author', '-password -__v -email')
    .select('-__v');

  if (search) {
    questions = await Question.find({
      title: {
        $regex: new RegExp('^' + search.toLowerCase(), 'i'),
      },
    })
      .populate('author', '-password -__v -email')
      .select('-__v');

    if (questions.length === 0) {
      return res.status(404).json({
        status: 'error',
        results: questions.length,
        message: 'Search term not found',
      });
    }
  } else if (search === '') {
    return res.status(400).json({
      status: 'error',
      message: 'Missing search term',
    });
  }
  res
    .status(200)
    .json({ status: 'success', results: questions.length, data: questions });
});

const updateQuestionVote = catchAsync(async (req, res, next) => {
  const { vote } = req.body;
  const { questionId } = req.params;
  const { _id } = req.user;

  if (!ObjectId.isValid(questionId)) {
    return res
      .status(400)
      .json({ status: 'error', error: 'Invalid Question ID' });
  }
  const question = await Question.findOne({ _id: questionId });
  if (!question) {
    return res.status(404).json({
      status: 'error',
      error: 'Question with the given ID not found',
    });
  }
  if (!vote) {
    return res.status(400).json({ status: 'error', error: 'Field required' });
  }
  if (vote !== 1 && vote !== -1) {
    return res
      .status(400)
      .json({ status: 'error', error: 'Vote number can only be 1 or -1' });
  }
  const updatedQuestion = await Question.findByIdAndUpdate(
    questionId,
    {
      $set: {
        votes: question.votes + vote,
        author: _id,
      },
    },
    { new: true }
  );
  res.status(200).json({ status: 'success', data: updatedQuestion });
});

module.exports = {
  createQuestion,
  getAllQuestions,
  updateQuestionVote,
};
