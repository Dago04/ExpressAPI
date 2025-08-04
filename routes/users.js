const express = require("express");
const router  = express.Router();

// 1️⃣  Controladores
const { getUsers, createUser, updateUser, deleteUser } =
      require("../controllers/usersController");

// 2️⃣  Validadores
const { createUserValidator } =
      require("../validators/userValidator");

router.get("/", getUsers);
router.post("/", createUserValidator, createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
