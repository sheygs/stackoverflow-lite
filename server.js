const dbConnection = require('./db/db');
const dotenv = require('dotenv');
dotenv.config();

// uncaught exception
process.on('uncaughtException', (err) => {
  log(err.name, err.message);
  log('UNCAUGHT EXCEPTION!💥 shutting down...');
  process.exit(1);
});

const app = require('./app');

const { log } = console;

dbConnection();

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Server running on localhost:${port}...`)
);

// errors outside express - unhandled rejections
process.on('unhandledRejection', (err) => {
  log(err.name, err.message);
  log('UNHANDLED REJECTION!💥 shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
