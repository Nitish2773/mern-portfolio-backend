import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Seed route (optional, you can remove if using seedAdmin.js)
export const seedAdmin = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const exists = await Admin.findOne({ email });
    if (exists) return res.json({ message: "Admin already exists" });

    const admin = await Admin.create({ email, password, name });
    res.json({ message: "Admin created", id: admin._id });
  } catch (e) {
    next(e);
  }
};

// Login route
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(admin._id);
    res.json({
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name },
    });
  } catch (e) {
    next(e);
  }
};
