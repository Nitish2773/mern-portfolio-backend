import { Router } from "express";
import { login, seedAdmin } from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/login", login);
// one-time seeding (disable in prod or protect)
router.post("/seed", seedAdmin);

router.get("/me", auth, (req, res) => res.json({ ok: true }));

export default router;
