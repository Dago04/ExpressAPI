const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');
const { protect } = require('../middlewares/authMiddleware');
const {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog
} = require("../controllers/blogsController");


// Obtener todos los blogs
router.get('/', getBlogs);

// Crear un nuevo blog
router.post('/', protect, createBlog);

// Obtener un blog por ID
router.get('/:id', getBlogById);

// Actualizar un blog por ID
router.put('/:id', protect, updateBlog);

// Eliminar un blog por ID
router.delete('/:id', protect, deleteBlog);

module.exports = router;
