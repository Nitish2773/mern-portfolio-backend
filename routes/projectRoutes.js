import { Router } from "express";
import { listProjects, createProject, updateProject, deleteProject } from "../controllers/projectController.js";
import { auth } from "../middleware/auth.js";

const router = Router();
router.get("/", listProjects);                      // ?category=data-engineering&q=airflow
router.post("/", auth, createProject);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);
export default router;
