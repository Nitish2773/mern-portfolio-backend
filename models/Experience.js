import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  logo: String, // URL
  company: { type: String, required: true },
  role: { type: String, required: true },
  location: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // null if current
  responsibilities: [String],
  skills: [String],
  description: String,
  certificateUrl: String, // open in modal
  priority: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Experience", experienceSchema);
