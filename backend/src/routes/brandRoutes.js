import express from 'express';
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand
} from '../controllers/brandController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getBrands);
router.post('/', requireAuth, createBrand);
router.put('/:id', requireAuth, updateBrand);
router.delete('/:id', requireAuth, deleteBrand);

export default router;
