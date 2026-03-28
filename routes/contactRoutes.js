import express from 'express';
import {
  createFormSubmission,
  getAllFormSubmissions,
  getFormSubmissionById
} from '../controllers/contactController.js';
import { adminRateLimiter } from '../middleware/rateLimiter.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/forms - Create new form submission (no rate limit)
router.post('/', createFormSubmission);

// GET /api/forms - Get all form submissions (authenticated users only)
router.get('/', authMiddleware, adminRateLimiter, getAllFormSubmissions);

// GET /api/forms/:id - Get single form submission (authenticated users only)
router.get('/:id', authMiddleware, adminRateLimiter, getFormSubmissionById);

export default router;
