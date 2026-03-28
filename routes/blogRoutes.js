import express from 'express';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';

const router = express.Router();

// Get all blogs
router.get('/', getAllBlogs);

// Get blog by ID
router.get('/:id', getBlogById);

// Create new blog
router.post('/', createBlog);

// Update blog
router.put('/:id', updateBlog);

// Delete blog
router.delete('/:id', deleteBlog);

export default router;
