// routes/auth.js
const express = require("express");
const rateLimit = require("express-rate-limit");
const { register, login } = require("../controllers/authController");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");
const router = express.Router();

// Límite exclusivo para esta ruta
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
});

router.post("/register", registerValidator, register);
router.post("/login", loginLimiter, loginValidator, login);

module.exports = router;
