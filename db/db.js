const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const { log, error } = console;

module.exports = () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(process.env.DB_URL, options)
    .then(() => log('Connected to mongoDB...'))
    .catch(({ message }) =>
      error('Could not connect to mongoDB...\n', message)
    );
};
