const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');

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
router.post('/', createBlog);

// Obtener un blog por ID
router.get('/:id', getBlogById);

// Actualizar un blog por ID
router.put('/:id', updateBlog);

// Eliminar un blog por ID
router.delete('/:id', deleteBlog);

module.exports = router;
