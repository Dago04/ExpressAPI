const User = require('../models/User');
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');

// Obtener todos los usuarios (sin mostrar contraseña)
const getUsers = asyncHandler(async (req, res) => {
  const page  = parseInt(req.query.page, 10)  || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip  = (page - 1) * limit;

  const users = await User.find()
    .select('-password -__v')
    .skip(skip)
    .limit(limit)
    .lean();
  res.json({ page, limit, count: users.length, users });
});

// Crear nuevo usuario
const createUser = asyncHandler(async (req, res, next) => {
  // Validar que el email no esté ya registrado
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).json({ message: 'Email ya registrado' });
  }
  const user = await User.create(req.body);
  const userObj = user.toObject();
  delete userObj.password;
  res.status(201).json(userObj);

});

// Actualizar usuario
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { profile, password, email } = req.body;

  // Construir cambios de forma segura
  const changes = {};
  if (email) changes.email = email.toLowerCase().trim();
  if (password) changes.password = password.trim();
  if (profile && typeof profile === 'object') {
    for (const [k, v] of Object.entries(profile)) {
      if (v !== undefined) changes[`profile.${k}`] = v;
    }
  }

  const updated = await User.findByIdAndUpdate(
    id,
    { $set: changes },
    { new: true, runValidators: true, context: 'query' }
  ).select('-password').lean();

  if (!updated) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(updated);
});

// Eliminar usuario
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await User.findByIdAndDelete(id).select('-password').lean();
  if (!deleted) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.status(204).end();
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
