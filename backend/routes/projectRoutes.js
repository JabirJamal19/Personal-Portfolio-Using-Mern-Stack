import express from 'express';
import { 
  getAllProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject,
  getFeaturedProjects,
  getProjectsByCategory
} from '../controllers/projectController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/category/:category', getProjectsByCategory);
router.get('/:id', getProjectById);

// Protected routes (admin only)
router.post('/', protect, adminOnly, createProject);
router.put('/:id', protect, adminOnly, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

export default router;
