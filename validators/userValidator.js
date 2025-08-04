// validators/userValidator.js
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

/**
 *  Reglas de validación y sanitizado para crear un usuario
 *  Basadas en el esquema User y en la lógica de usersController.
 */
exports.createUserValidator = [
  // email
  body('email')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail()
    .isLength({ min: 10 }),

  // password
  body('password')
    .isString().withMessage('La contraseña debe ser texto')
    .isLength({ min: 8, max: 72 }),

  // profile (objeto completo)
  body('profile').isObject().withMessage('Debes enviar el objeto "profile"'),

  body('profile.firstName')
    .isString().withMessage('firstName debe ser texto')
    .trim().isLength({ min: 2, max: 50 }),

  body('profile.lastName')
    .isString().withMessage('lastName debe ser texto')
    .trim().isLength({ min: 2, max: 50 }),

  body('profile.age')
    .isInt({ min: 0, max: 120 }).withMessage('age debe ser un entero positivo'),

  body('profile.phoneNumber')
    .optional({ checkFalsy: true })
    .isString().trim().isLength({ max: 20 }),

  body('profile.userDescription')
    .optional({ checkFalsy: true })
    .isString().trim().isLength({ max: 500 }),

  body('profile.job')
    .isString().withMessage('job debe ser texto')
    .trim().isLength({ min: 2, max: 100 }),

  // middleware genérico: responde 422 si hay errores
  validate
];

exports.updateUserValidator = [
  body('email')
    .optional()
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),

  body('password')
    .optional()
    .isString().isLength({ min: 8, max: 72 }),

  body('profile').optional().isObject(),
  body('profile.firstName').optional().isString().trim().isLength({ min: 2, max: 50 }),
  body('profile.lastName').optional().isString().trim().isLength({ min: 2, max: 50 }),
  body('profile.age').optional().isInt({ min: 0, max: 120 }),
  body('profile.phoneNumber').optional({ checkFalsy: true }).isString().trim().isLength({ max: 20 }),
  body('profile.userDescription').optional({ checkFalsy: true }).isString().trim().isLength({ max: 500 }),
  body('profile.job').optional().isString().trim().isLength({ min: 2, max: 100 }),

  validate
];
