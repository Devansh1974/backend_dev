import { users } from '../models/User.js';

export const submitFeedback = (req, res) => {
  const { service_name, feedback_text } = req.body;
  const user = users.find(u => u.username === req.user.username);
  
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.feedbacks.push({ service_name, feedback_text });
  res.status(200).json({ message: 'Feedback submitted successfully' });
};

export const getFeedback = (req, res) => {
  const user = users.find(u => u.username === req.user.username);
  
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.status(200).json({ feedbacks: user.feedbacks });
};
