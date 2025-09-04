import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const { MONGO_URI, ADMIN_EMAIL, ADMIN_PASS, ADMIN_NAME } = process.env;

if (!MONGO_URI) {
  console.error("MONGO_URI not set in .env");
  process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

const seedAdmin = async () => {
  try {
    const email = ADMIN_EMAIL || "admin@example.com";
    const password = ADMIN_PASS || "admin123";
    const name = ADMIN_NAME || "Admin";

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log("Admin already exists:", email);
      return mongoose.disconnect();
    }

    // ✅ Save plain text, pre-save hook will hash it
    const admin = await Admin.create({ email, password, name });
    console.log("Admin created successfully:", admin.email);

    mongoose.disconnect();
  } catch (error) {
    console.error("Error creating admin:", error);
    mongoose.disconnect();
  }
};

seedAdmin();
