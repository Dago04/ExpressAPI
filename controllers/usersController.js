const User = require('../models/User');
const mongoose = require('mongoose');

// Obtener Todos los usuarios
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error); // delega al middleware global
  }
};

// POST nuevo usuario
const createUser = async (req, res, next) => {
  const { name, job } = req.body;

  if (!name || !job || typeof name !== 'string' || typeof job !== 'string') {
    res.status(400);
    return next(new Error('Campos inválidos'));
  }

  try {
    const newUser = new User({ name: name.trim(), job: job.trim() });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

// Actualizar un usuario
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, job } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    return next(new Error('ID de usuario inválido'));
  }

  if (!name && !job) {
    res.status(400);
    return next(new Error('Debe enviar al menos un campo (name o job)'));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { ...(name && { name }), ...(job && { job }) } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404);
      return next(new Error('Usuario no encontrado'));
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Eliminar un usuario
const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    return next(new Error('ID inválido'));
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

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
  deleteUser,
};
