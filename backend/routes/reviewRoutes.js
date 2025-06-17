import express from "express";
const router = express.Router();
import {createReview, getReview,getProviderReviewAndRating, updateReview, deleteReview } from "../Controllers/reviewController.js";
import { authenticate,authorizeProvider } from "../middleware/authentication.js";

router.post("/", authenticate, createReview);
router.get("/", authenticate, getReview);
router.get("/provider",authenticate,authorizeProvider,getProviderReviewAndRating);
router.put("/:id",authenticate,updateReview);
router.delete("/:id",authenticate,deleteReview);

export default router;
