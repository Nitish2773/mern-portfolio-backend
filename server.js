// server.js
// ⚡ Render-ready MERN backend setup

// ----------------------
// 1️⃣ Load env & fix DEBUG_URL
// ----------------------
import dotenv from "dotenv";
dotenv.config();

// Prevent Render from breaking path-to-regexp
if (process.env.DEBUG_URL) delete process.env.DEBUG_URL;
process.env.DEBUG_URL = "";

// ----------------------
// 2️⃣ Core imports
// ----------------------
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { connectDB } from "./config/db.js";

// Routes
import educationRoutes from "./routes/educationRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import certificationRoutes from "./routes/certificationRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import profileRoutes from "./routes/ProfileRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Error middleware
import { notFound, errorHandler } from "./middleware/error.js";

// ----------------------
// 3️⃣ Initialize app & middleware
// ----------------------
const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));

// ----------------------
// 4️⃣ API routes
// ----------------------
app.use("/api/profile", profileRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", authRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

// ----------------------
// 5️⃣ Serve React frontend in production
// ----------------------
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/build", "index.html"))
  );
}

// ----------------------
// 6️⃣ Error handling middleware
// ----------------------
app.use(notFound);
app.use(errorHandler);

// ----------------------
// 7️⃣ Connect DB & start server
// ----------------------
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    // small timeout to avoid env race on Render
    setTimeout(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }, 100);
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  });
