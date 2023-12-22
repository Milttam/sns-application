import express from 'express';
import {
    getUser, 
    getUserFriends,
    addRemoveFreind,
} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

/** READ Routes */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/**UPDATE Routes */
// for current user with id, update friend list with friendId
router.patch("/:id/friendId", verifyToken, addRemoveFreind);

export default router;