// routes/auth.js
const express = require('express');
const rateLimit    = require('express-rate-limit');
const { register, login } = require('../controllers/authController');
const router = express.Router();


// Límite exclusivo para esta ruta
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
});

router.post('/register', register);
router.post('/login', loginLimiter, login);

module.exports = router;