import express from 'express';
import { getBlogPosts, createBlogPost } from '../controllers/BlogController.js';

const router = express.Router();

router.get('/', getBlogPosts);
router.post('/', createBlogPost);

export default router;
