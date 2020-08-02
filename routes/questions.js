const questionController = require('../controllers/questionController');
const answerController = require('../controllers/answerController');
const authMiddleware = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router
  .route('/')
  .post(authMiddleware.verifyToken, questionController.createQuestion)
  .get(questionController.getAllQuestions);

router
  .route('/:questionId/answers')
  .post(authMiddleware.verifyToken, answerController.createAnswer)
  .get(answerController.getAllAnswersFromQuestion);

router
  .route('/:questionId/vote')
  .put(authMiddleware.verifyToken, questionController.updateQuestionVote);

module.exports = router;
