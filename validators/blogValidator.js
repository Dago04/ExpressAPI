const { body } = require('express-validator');
const validate = require('../middlewares/validate');


exports.createBlogValidator = [
 body('title')
    .isString().withMessage('El título debe ser texto')
    .trim().isLength({ min: 3, max: 100 }),
  body('summary')
    .isString().trim().escape()                      // escape() previene XSS :contentReference[oaicite:5]{index=5}
    .isLength({ min: 10 }),
  body('author')
    .isMongoId().withMessage('ID de autor inválido'),
  validate         
];

exports.updateBlogValidator = [
  body('title')
    .optional()
    .isString().trim().isLength({ min: 3, max: 100 }),
  body('summary')
    .optional()
    .isString().trim().escape().isLength({ min: 10 }),
  validate
];
