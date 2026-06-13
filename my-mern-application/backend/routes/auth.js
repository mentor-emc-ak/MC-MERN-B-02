import express from 'express';
import { extractFirebaseInfo, protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/me', protect, (req, res) => {
  res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
});

router.post('/register', async (req, res) => {
  try {
    const decoded = await extractFirebaseInfo(req);

    // Check if user already exists in MongoDB
    const existingUser = await User.findOne({ firebaseUid: decoded.uid });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user in MongoDB
    const newUser = new User({
      firebaseUid: decoded.uid,
      name: decoded.name,
      email: decoded.email,
    });
    await newUser.save();
    res.status(201).json({ id: newUser._id, name: newUser.name, email: newUser.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
