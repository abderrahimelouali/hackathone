import express from 'express';
import { getMapLocations, createMapLocation, deleteMapLocation } from '../controllers/MapLocationController.js';

const router = express.Router();

router.get('/', getMapLocations);
router.post('/', createMapLocation);
router.delete('/:id', deleteMapLocation);

export default router;
