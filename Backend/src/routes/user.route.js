import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";

import {
  getRecommendedUsers,
  getMyFriends,
  sendFriendRequests,
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendReqs,
} from "../controllers/user.controller.js";

const router = express.Router();

// apply auth middleware to all routes
router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-requests/:id", protectRoute, sendFriendRequests);

router.put("/friend-requests/:id/accept", protectRoute, acceptFriendRequest);

router.get("/friend-requests", protectRoute, getFriendRequests);

router.get("/outgoing-friend-requests", protectRoute, getOutgoingFriendReqs);

export default router;
