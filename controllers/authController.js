const { User, users } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret123';

const register = async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User(username, hashed);
  users.push(user);
  res.cookie('username', username);
  res.status(200).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.cookie('token', token);
  res.status(200).json({ message: `Welcome back, ${username}` });
};

module.exports = { register, login };
