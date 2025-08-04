const errorHandler = (err, req, res, next) => {
    // 1) Duplicate e-mail
  if (err.code === 11000 && err.keyPattern?.email) {
    return res.status(409).json({ message: 'Email ya registrado' });
  }

  // 2) Cast a ObjectId => 400
  if (err.name === 'CastError') {
    return res.status(400).json({ message: `ID inválido: ${err.value}` });
  }

  // 3) Validaciones de Mongoose => 422
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(422).json({ message: messages.join(', ') });
  }

  // 4) Fallback: 500
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
