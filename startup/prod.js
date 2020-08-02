const helmet = require('helmet');
const compression = require('compression');

// set security HTTP Headers
module.exports = function (app) {
  app.use(helmet());
  app.use(compression());
};
