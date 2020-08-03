const AppError = require('./utils/error');
const ErrorHandler = require('./controllers/errorController');
const usersRoute = require('./routes/users');
const questionsRoute = require('./routes/questions');
const answersRoute = require('./routes/answers');
const express = require('express');
const morgan = require('morgan');
const app = express();

/* MIDDLEWARES */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

require('./startup/prod')(app);

// req.body
app.use(express.json());
app.use('/api/v1', usersRoute);
app.use('/api/v1/questions', questionsRoute);
app.use('/api/v1/answers', answersRoute);

// base path
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Stackoverflow Lite API',
  });
});

// non-existent path - must be placed last
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// error middleware
app.use(ErrorHandler);

module.exports = app;
