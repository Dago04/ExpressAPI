// validators/authValidator.js
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

/**
 * Reglas de validación y sanitizado para /register y /login
 * Basadas en recomendaciones de seguridad OWASP y artículos comunitarios.
 */

// ▸ POST /api/auth/register
exports.registerValidator = [
  body('email')
    .isEmail().withMessage('Email inválido')        // formato RFC5322
    .normalizeEmail(),                              // sanea y pone lowercase
  body('password')
    .isString().withMessage('La contraseña debe ser texto')
    .isLength({ min: 8, max: 72 })
      .withMessage('La contraseña debe tener entre 8 y 72 caracteres')
    // 👉 regla opcional: fuerza mínima (1 mayús, 1 minús, 1 número)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      .withMessage('Debe incluir mayúscula, minúscula y número')
    .trim(),
  validate                                           // ← responde 422 si falla
];

// ▸ POST /api/auth/login
exports.loginValidator = [
  body('email')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .isString().withMessage('La contraseña debe ser texto')
    .isLength({ min: 8 })
      .withMessage('Contraseña demasiado corta'),
  validate
];
