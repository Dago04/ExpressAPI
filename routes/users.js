const express = require("express");
const router  = express.Router();
const { protect } = require('../middlewares/authMiddleware');
// 1️⃣  Controladores
const { getUsers, createUser, updateUser, deleteUser } =
      require("../controllers/usersController");

// 2️⃣  Validadores
const { createUserValidator,updateUserValidator } =
      require("../validators/userValidator");
const validateId = require('../middlewares/validateObjectId');

router.get("/", getUsers);
router.post("/",protect, createUserValidator, createUser);
router.put("/:id",protect, validateId(['id']), updateUserValidator, updateUser);
router.delete("/:id",protect, validateId(['id']), deleteUser);

module.exports = router;
