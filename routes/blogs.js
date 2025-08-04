const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { createBlogValidator,updateBlogValidator } = require('../validators/blogValidator');
const validateId = require('../middlewares/validateObjectId');
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
router.post('/', protect, createBlogValidator, createBlog);

// Obtener un blog por ID
router.get('/:id', validateId(['id']), getBlogById);

// Actualizar un blog por ID
router.put('/:id', protect, validateId(['id']) , updateBlogValidator, updateBlog);

// Eliminar un blog por ID
router.delete('/:id', protect, validateId(['id']), deleteBlog);

module.exports = router;
