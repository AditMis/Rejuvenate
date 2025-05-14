import jwt from 'jsonwebtoken';

//generating a JWToken for a given user ID
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
export default generateToken;
