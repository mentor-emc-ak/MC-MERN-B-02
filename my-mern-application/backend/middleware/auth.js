import { auth } from '../config/firebase.js';
import User from '../models/User.js';

export const extractFirebaseInfo = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Not authorized');
  }
  const token = authHeader.split(' ')[1];
  const decoded = await auth.verifyIdToken(token);
  return decoded;
};

export const protect = async (req, res, next) => {
  try {
    const decoded = await extractFirebaseInfo(req);

    let user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
        name: decoded.name || decoded.email,
      });
    } else if (decoded.name && user.name !== decoded.name) {
      user.name = decoded.name;
      await user.save();
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
