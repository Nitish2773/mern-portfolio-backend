// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { connectDB } from "./config/db.js";

// Import routes
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

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json({ limit: "1mb" }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));

// Health check route
app.get("/api/health", (req, res) => res.json({ ok: true }));

// API routes (all relative paths)
app.use("/api/profile", profileRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", authRoutes);

// Serve React frontend in production
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build"))); // Adjust path if needed

  // Catch-all: send React index.html for any unknown route
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/build", "index.html"))
  );
}

// Error handling
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB & start server
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  });
