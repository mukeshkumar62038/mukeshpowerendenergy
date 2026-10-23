import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isMongoConnected, getDatabase } from '../config/db.js';

export const login = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(503).json({ success: false, message: 'Authentication is not configured' });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    let user = null;

    if (isMongoConnected()) {
      user = await User.findOne({ email: email.toLowerCase() }).lean();
    }

    if (!user) {
      const db = getDatabase();
      user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid email address or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during login' });
  }
};

export const getMe = (req, res) => {
  return res.json({
    success: true,
    user: req.user
  });
};

export default {
  login,
  getMe
};
