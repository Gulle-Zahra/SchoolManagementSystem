import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import { User, Teacher, Student, Principal } from '../models/User.model.js'

const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// register 
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, ...rest } = req.body;
  if (!name || !email || !password || !role) {
    res.status(400); throw new Error('name, email, password and role are required');
  }
  const existing = await User.findOne({ email });
  if (existing) { res.status(400); throw new Error('Email already registered'); }

  let user;
  if (role === 'teacher') user = await Teacher.create({ name, email, password, role, ...rest });
  else if (role === 'student') user = await Student.create({ name, email, password, role, ...rest });
  else user = await Principal.create({ name, email, password, role, ...rest });

  res.status(201).json({
    token: generateToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

// login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    res.status(401); throw new Error('Invalid credentials');
  }
  res.json({ token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role }});
});

export { register, login };
