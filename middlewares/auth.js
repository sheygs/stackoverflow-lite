const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ status: 'error', error: 'Unauthorized - Header not set' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      status: 'error',
      error: 'Unauthorized - Please provide a token',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch ({ message }) {
    return res.status(400).json({ status: 'error', error: message });
  }
};

module.exports = {
  verifyToken,
};
