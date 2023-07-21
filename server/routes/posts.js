import express from 'express';
import {getFeedPosts, getUserPosts, likePost} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const routes = express.Router();

/** READ Routes */
router.get("/", verifyToken, getFeedPosts);
router.get("/:id", verifyToken, getUserPosts);

/** UPDATE Routes */
router.patch("/:id/like", verifyToken, likePost);

export default router;