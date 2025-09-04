import { Router } from "express";
import { listSkills, createSkill, updateSkill, deleteSkill } from "../controllers/skillController.js";
import { auth } from "../middleware/auth.js";

const router = Router();
router.get("/", listSkills);                        // ?category=web-dev&sortBy=proficiency&order=desc&q=aws
router.post("/", auth, createSkill);
router.put("/:id", auth, updateSkill);
router.delete("/:id", auth, deleteSkill);
export default router;
