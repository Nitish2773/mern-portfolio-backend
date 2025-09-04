import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  logo: String, // URL
  institution: { type: String, required: true },
  program: { type: String, required: true }, // B.Tech CSE, etc.
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // null if ongoing
  skills: [String],
  description: String,
  priority: { type: Number, default: 0 } // for ordering
}, { timestamps: true });

export default mongoose.model("Education", educationSchema);
