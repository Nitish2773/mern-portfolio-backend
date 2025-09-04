import { Router } from "express";
import { listCerts, createCert, updateCert, deleteCert } from "../controllers/certificationController.js";
import { auth } from "../middleware/auth.js";

const router = Router();
router.get("/", listCerts);                         // ?tag=aws
router.post("/", auth, createCert);
router.put("/:id", auth, updateCert);
router.delete("/:id", auth, deleteCert);
export default router;
