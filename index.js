import express from 'express';
import cookieParser from 'cookie-parser';
import { register, login } from './controllers/authController.js';
import { submitFeedback, getFeedback } from './controllers/feedbackController.js';
import { verifyToken } from './middleware/authMiddleware.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post('/register', register);
app.post('/login', login);
app.post('/feedback', verifyToken, submitFeedback);
app.get('/feedback', verifyToken, getFeedback);

app.get('/hey',(req,res)=>{
    res.send('Welcome')
})
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
