const User = require('../models/User');
const mongoose = require('mongoose');

// Obtener todos los usuarios (sin mostrar contraseña)
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Crear nuevo usuario
const createUser = async (req, res, next) => {
  const { email, password, profile } = req.body;

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    res.status(400);
    return next(new Error('Email y contraseña son requeridos'));
  }

  try {
    const newUser = new User({
      email: email.toLowerCase().trim(),
      password: password.trim(), // (más adelante podemos hashearla con bcrypt)
      profile: {
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
        age: profile.age,
        phoneNumber: profile?.phoneNumber || '',
        userDescription: profile?.userDescription || '',
        job: profile.job.trim()
      }
    });

    const savedUser = await newUser.save();
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

// Actualizar usuario
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { profile } = req.body;

  if (!profile || typeof profile !== 'object') {
    res.status(400);
    return next(new Error('Debes enviar un objeto válido en "profile"'));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { profile } },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      res.status(404);
      return next(new Error('Usuario no encontrado'));
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Eliminar usuario
const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id).select('-password');

    if (!deletedUser) {
      res.status(404);
      return next(new Error('Usuario no encontrado'));
    }

    res.json({ message: 'Usuario eliminado', user: deletedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
