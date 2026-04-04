import express from 'express';
import { getActivities, createActivity, updateActivity } from '../controllers/ActivityController.js';

const router = express.Router();

router.get('/', getActivities);
router.post('/', createActivity);
router.put('/:id', updateActivity);

export default router;
