const jwt  = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });

exports.register = asyncHandler(async (req, res, next) => {
  
  const user = await User.create(req.body);
  return res.status(201).json({ id: user._id });
});
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  // Validación de credenciales
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  const token = signToken(user._id);
  res.json({ token });
});