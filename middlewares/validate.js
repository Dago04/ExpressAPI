const { validationResult } = require('express-validator');

/**
 * Middleware genérico:
 *   • Reúne todos los errores generados por las reglas de express-validator.
 *   • Si hay errores ⇒ responde 422 Unprocessable Entity.
 */
module.exports = (req, res, next) => {
  const errors = validationResult(req);              // recopila reglas fallidas :contentReference[oaicite:3]{index=3}
  if (!errors.isEmpty()) {
    return res.status(422).json({                    // 422 = Unprocessable Entity
      errors: errors.array()
    });
  }
  next();
};