const jwt  = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Token is missing' });
  }
  const token = header.split(' ')[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET); // valida firma & exp
    req.user = await User.findById(id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};