import express from 'express';
import { 
  submitContactForm, 
  getAllContacts, 
  updateContactStatus,
  deleteContact
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { validateContactForm } from '../middleware/validators.js';

const router = express.Router();

// Public route
router.post('/', validateContactForm, submitContactForm);

// Protected routes (admin only)
router.get('/', protect, adminOnly, getAllContacts);
router.patch('/:id/status', protect, adminOnly, updateContactStatus);
router.delete('/:id', protect, adminOnly, deleteContact);

export default router;
