import express from 'express';
import { getTransports, createTransport } from '../controllers/TransportController.js';

const router = express.Router();

router.get('/', getTransports);
router.post('/', createTransport);

export default router;
