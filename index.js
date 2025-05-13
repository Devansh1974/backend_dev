const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(feedbackRoutes);

app.get('/', (req, res) => {
  res.send('Feedback Auth Backend Running');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
