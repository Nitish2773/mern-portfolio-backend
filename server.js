// server.js

// ----------------------
// 1️⃣ Load env
// ----------------------
import dotenv from "dotenv";
dotenv.config();

// ----------------------
// 2️⃣ Core imports
// ----------------------
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

// DB
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
app.use(compression());
app.use(helmet());

// CORS (simple + fast)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

// Logging only in dev
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

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

// Health check (important for uptime pingers)
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ----------------------
// 5️⃣ Error handling
// ----------------------
app.use(notFound);
app.use(errorHandler);

// ----------------------
// 6️⃣ Start server
// ----------------------
const PORT = process.env.PORT || 5000;

// Connect DB once on startup
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
