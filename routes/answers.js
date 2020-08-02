const answerController = require('../controllers/answerController');
const express = require('express');
const router = express.Router();

router.route('/').get(answerController.getAllAnswers);

module.exports = router;
