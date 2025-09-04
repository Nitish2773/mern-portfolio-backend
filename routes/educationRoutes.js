import { Router } from "express";
import { listEducation, createEducation, updateEducation, deleteEducation } from "../controllers/educationController.js";
import { auth } from "../middleware/auth.js";

const router = Router();
router.get("/", listEducation);
router.post("/", auth, createEducation);
router.put("/:id", auth, updateEducation);
router.delete("/:id", auth, deleteEducation);
export default router;
