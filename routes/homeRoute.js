const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMidlleware');

router.get('/welcome', authMiddleware, (req, res) => {
  const { username, userId, role } = req.userInfo;
  res.json({
    message: 'Welcome to the homepage',
    user: {
      _id: userId,
      username,
      role,
    },
  });
});

module.exports = router;
