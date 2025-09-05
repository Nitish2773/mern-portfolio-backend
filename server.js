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
import path from "path";
import { fileURLToPath } from "url";
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
// 3️⃣ ES module __dirname fix
// ----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------
// 4️⃣ Initialize app & middleware
// ----------------------
const app = express();
app.use(express.json({ limit: "1mb" }));

// Safe CORS setup
const allowedOrigins = [
  process.env.CLIENT_ORIGIN, // main frontend
  // Add more origins here if needed
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests from tools like Postman / server-side (no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) return callback(null, true);

    return callback(new Error("CORS policy: Origin not allowed"), false);
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(helmet());
app.use(morgan("dev"));

// ----------------------
// 5️⃣ API routes
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
// 6️⃣ Serve React frontend in production
// ----------------------
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../client/build");
  app.use(express.static(buildPath));
  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// ----------------------
// 7️⃣ Error handling middleware
// ----------------------
app.use("/*splat", notFound);
app.use(errorHandler);

// ----------------------
// 8️⃣ Connect DB & start server
// ----------------------
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    // Small timeout to avoid env race on Render
    setTimeout(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }, 100);
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  });
