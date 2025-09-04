import { Router } from "express";
import { submitMessage, listMessages, markRead } from "../controllers/messageController.js";
import { auth } from "../middleware/auth.js";

const router = Router();
router.post("/", submitMessage);  // public contact form
router.get("/", auth, listMessages);
router.patch("/:id/read", auth, markRead);
export default router;
