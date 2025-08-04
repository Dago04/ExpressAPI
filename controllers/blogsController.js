const Blog = require('../models/Blog');
const mongoose = require('mongoose');

// Obtener todos los blogs
const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .populate('author', '-password -__v') // Opcional: traer info del autor
      .select('-__v');
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

// Crear nuevo blog
const createBlog = async (req, res, next) => {
  const { title, summary, author } = req.body;

  if (!title || !summary || !author) {
    res.status(400);
    return next(new Error('Todos los campos son requeridos'));
  }

  if (!mongoose.Types.ObjectId.isValid(author)) {
    res.status(400);
    return next(new Error('ID de autor inválido'));
  }

  try {
    const newBlog = new Blog({
      title: title.trim(),
      summary: summary.trim(),
      author
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
};

// Obtener blog por ID
const getBlogById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id)
      .populate('author', '-password -__v')
      .select('-__v');

    if (!blog) {
      res.status(404);
      return next(new Error('Blog no encontrado'));
    }

    res.json(blog);
  } catch (error) {
    next(error);
  }
};

// Actualizar blog
const updateBlog = async (req, res, next) => {
  const { id } = req.params;
  const { title, summary } = req.body;

  if (!title && !summary) {
    res.status(400);
    return next(new Error('Debe enviar al menos "title" o "summary"'));
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(title && { title: title.trim() }),
          ...(summary && { summary: summary.trim() })
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      res.status(404);
      return next(new Error('Blog no encontrado'));
    }

    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

// Eliminar blog
const deleteBlog = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      res.status(404);
      return next(new Error('Blog no encontrado'));
    }

    res.json({ message: 'Blog eliminado', blog: deletedBlog });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog
};