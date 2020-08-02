const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const { log } = console;

router.route('/auth/signup').post(userController.signUp);
router.route('/auth/signin').post(userController.signIn);
router.route('/users').get(userController.getAllUsers);
router.get(
  '/auth/verify',
  authMiddleware.verifyToken,
  async (req, res, next) => {
    try {
      log(req.user._id);
      res.send(true);
    } catch ({ message }) {
      next(message);
    }
  }
);
module.exports = router;
