const express = require("express");
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

router.get("/", getUsers);
router.post("/",protect, createUser);
router.put("/:id",protect, updateUser);
router.delete("/:id",protect, deleteUser);

module.exports = router;
