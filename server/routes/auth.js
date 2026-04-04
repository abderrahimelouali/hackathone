import express from 'express';
import { registerUser, authUser, getUserProfile, verifyOTP, resendOTP } from '../controllers/AuthController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.get('/me', protect, getUserProfile);

export default router;
