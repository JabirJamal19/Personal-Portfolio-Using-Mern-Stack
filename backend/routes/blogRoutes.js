import express from 'express';
import { 
  getAllBlogs, 
  getBlogBySlug, 
  createBlog, 
  updateBlog, 
  deleteBlog,
  incrementViews,
  getBlogsByTag
} from '../controllers/blogController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/tag/:tag', getBlogsByTag);
router.get('/:slug', getBlogBySlug);
router.patch('/:slug/view', incrementViews);

// Protected routes (admin only)
router.post('/', protect, adminOnly, createBlog);
router.put('/:id', protect, adminOnly, updateBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);

export default router;
