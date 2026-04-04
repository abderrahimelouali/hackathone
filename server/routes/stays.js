import express from 'express';
import { getStays, createStay } from '../controllers/StayController.js';

const router = express.Router();

router.get('/', getStays);
router.post('/', createStay);

export default router;
