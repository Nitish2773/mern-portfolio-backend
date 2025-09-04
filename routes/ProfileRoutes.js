import { Router } from "express";
import { getProfile, upsertProfile } from "../controllers/profileController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// Get the single profile (no _id needed)
router.get("/", getProfile);

// Upsert the single profile
router.put("/", auth, upsertProfile);

export default router;
