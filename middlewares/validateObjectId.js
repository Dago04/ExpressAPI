const mongoose = require('mongoose');

module.exports = (fields) => (req, res, next) => {
  for (const f of fields) {
    const value = req.params[f] || req.body[f];
    if (value && !mongoose.Types.ObjectId.isValid(value)) {
      return res.status(400).json({ message: `ID inválido para ${f}` });
    }
  }
  next();
};
