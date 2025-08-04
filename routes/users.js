const express = require("express");
const router  = express.Router();

// 1️⃣  Controladores
const { getUsers, createUser, updateUser, deleteUser } =
      require("../controllers/usersController");

// 2️⃣  Validadores
const { createUserValidator } =
      require("../validators/userValidator");
const validateId = require('../middlewares/validateObjectId');

router.get("/", getUsers);
router.post("/", createUserValidator, createUser);
router.put("/:id", validateId(['id']), updateUser);
router.delete("/:id", validateId(['id']), deleteUser);

module.exports = router;
