const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, users } = require('../models/User');

const router = express.Router();
const SECRET = 'secret123';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User(username, hashed);
  users.push(newUser);
  res.cookie('username', username); // optional: helps identify the session
  res.status(200).json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.cookie('token', token);
  res.status(200).json({ message: `Welcome ${username}` });
});

module.exports = router;
