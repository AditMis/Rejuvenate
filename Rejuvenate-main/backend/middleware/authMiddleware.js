//script/middleware for validating the
//token/authenticating the logging in user

import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //grabbing token from req.headers
      //separating token from "Bearer"
      token = req.headers.authorization.split(' ')[1];
      //jwt.verify takes in token and secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized, token failed.');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token.');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin.');
  }
};
export { authMiddleware, admin };
