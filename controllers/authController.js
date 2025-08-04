const jwt  = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });

exports.register = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({ id: user._id });
  } catch (err) {
    if (err.code === 11000) {
      // Clave duplicada en Mongo (email único)
      return res.status(409).json({ message: 'Email ya registrado' });
    }
    throw err; // será capturado por asyncHandler
  }
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