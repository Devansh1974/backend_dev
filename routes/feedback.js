const express = require('express');
const jwt = require('jsonwebtoken');
const { users } = require('../models/User');

const router = express.Router();
const SECRET = 'secret123';

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
};

router.post('/feedback', verifyToken, (req, res) => {
  const { service_name, feedback_text } = req.body;
  const user = users.find(u => u.username === req.user.username);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.feedbacks.push({ service_name, feedback_text });
  res.status(200).json({ message: 'Feedback submitted' });
});

router.get('/feedback', verifyToken, (req, res) => {
  const user = users.find(u => u.username === req.user.username);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json({ feedbacks: user.feedbacks });
});

module.exports = router;
