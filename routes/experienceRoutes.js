import { Router } from "express";
import { listExperience, createExperience, updateExperience, deleteExperience } from "../controllers/experienceController.js";
import { auth } from "../middleware/auth.js";

const router = Router();
router.get("/", listExperience);
router.post("/", auth, createExperience);
router.put("/:id", auth, updateExperience);
router.delete("/:id", auth, deleteExperience);
export default router;
