import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ status: 'error', message: 'User already exists' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      status: 'success',
      data: { id: user._id, name: user.name, email: user.email, role: user.role, token }
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);
    res.status(200).json({
      status: 'success',
      data: { id: user._id, name: user.name, email: user.email, role: user.role, token }
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ status: 'error', message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ status: 'success', message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
