const express = require('express');
const cookieParser = require('cookie-parser');
const { register, login } = require('./controllers/authController');
const { submitFeedback, getFeedback } = require('./controllers/feedbackController');
const { verifyToken } = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post('/register', register);
app.post('/login', login);
app.post('/feedback', verifyToken, submitFeedback);
app.get('/feedback', verifyToken, getFeedback);

app.get('/hey', (req, res) => {
  res.send('Welcome');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
