const Blog = require('../models/Blog');
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');

// Obtener todos los blogs
const getBlogs = asyncHandler(async (req, res) => {
  const page  = parseInt(req.query.page, 10)  || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip  = (page - 1) * limit;

  const blogs = await Blog.find()
    .populate('author', '-password -__v')
    .select('-__v')
    .skip(skip)
    .limit(limit)
    .lean();

  res.json({ page, limit, count: blogs.length, blogs });
});

// Crear nuevo blog
const createBlog = asyncHandler(async (req, res) => {
  const { title, summary } = req.body;
  if (!title || !summary) {
    return res.status(400).json({ message: 'Título y resumen requeridos' });
  }
  const blog = await Blog.create({
    title: title.trim(),
    summary: summary.trim(),
    author: req.user._id,
  });
  res.status(201).json(blog);
});

// Obtener blog por ID
const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id)
    .populate('author', '-password -__v')
    .select('-__v')
    .lean();
  if (!blog) return res.status(404).json({ message: 'Blog no encontrado' });
  res.json(blog);
});

// Actualizar blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, summary } = req.body;
  if (!title && !summary) {
    return res.status(400).json({ message: 'Debe enviar "title" o "summary"' });
  }

  // Verificar autoría
  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).json({ message: 'Blog no encontrado' });
  if (!blog.author.equals(req.user._id)) {
    return res.status(403).json({ message: 'No autorizado' });
  }

  const changes = {};
  if (title) changes.title = title.trim();
  if (summary) changes.summary = summary.trim();

  const updated = await BlogModel.findByIdAndUpdate(id, { $set: changes }, {
    new: true,
    runValidators: true,
  }).lean();

  res.json(updated);
});

// Eliminar blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).json({ message: 'Blog no encontrado' });
  if (!blog.author.equals(req.user._id)) {
    return res.status(403).json({ message: 'No autorizado' });
  }
  await blog.deleteOne();
  res.status(204).end();
});

module.exports = {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog
};