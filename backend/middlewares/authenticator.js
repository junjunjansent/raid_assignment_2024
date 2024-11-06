// import modules
import jwt from 'jsonwebtoken';

// import utils
import asyncHandler from './asyncHandler.js';
import user from '../models/user_Model.js';

// ------ To authenticate user
const check_userAuthority = asyncHandler(async (req, res, next) => {
    let webToken;
  
    // Read token from cookie 'jwt'
    webToken = req.cookies.jwt;
  
    if (webToken) {
      try {
        const decoded = jwt.verify(webToken, process.env.JWT_SECRET);
        req.userMiddle = await user.findById(decoded.userID).select('-password'); // removes password field
        next();

      } catch (error) {
        res.status(401);
        throw new Error('User is not authorised due TOKEN FAILED');
      }
    } else {
      res.status(401);
      throw new Error('User is not authorised due NO TOKEN');
    }
});
  
// ------- To authenticate user as admin
const check_adminRights = (req, res, next) => {
    if (req.userMiddle && req.userMiddle.adminRights) {
      next();
    } else {
      res.status(401);
      throw new Error('User is NOT an ADMIN');
    }
};
  
export { check_userAuthority, check_adminRights };