import jwt from 'jsonwebtoken'
import  asyncHandler from 'express-async-handler'
import { User } from '../models/User.model.js'

const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401); throw new Error('Not authorized, token missing');
  }
  const token = header.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select('-password');
  if (!user) { res.status(401); throw new Error('User not found'); }
  req.user = user;
  next();
});

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    res.status(403); throw new Error('Forbidden: insufficient permissions');
  }
  next();
};

export { protect, authorizeRoles };
