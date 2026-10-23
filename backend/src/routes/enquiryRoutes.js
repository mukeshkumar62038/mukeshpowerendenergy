import express from 'express';
import {
  getEnquiries,
  createEnquiry,
  updateEnquiryStatus,
  deleteEnquiry
} from '../controllers/enquiryController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Submit enquiry
router.post('/', createEnquiry);

// Protected (Admin only): View, update status, delete
router.get('/', requireAuth, getEnquiries);
router.put('/:id/status', requireAuth, updateEnquiryStatus);
router.delete('/:id', requireAuth, deleteEnquiry);

export default router;
