// backend/models/Profile.js
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    hero: {
      name: { type: String, required: true }, // e.g., "Sri Nitish"
      caption: { type: String, required: true }, // e.g., "Full-Stack → Data Engineer"
      description: { type: String, required: true }, // short pitch
      profileImage: { type: String, required: true }, // URL
    },
    about: {
      headline: { type: String }, // e.g., "Who I am"
      bio: { type: String, required: true }, // full 'about me'
      location: { type: String },
      email: { type: String, required: true },
      phone: { type: String },
      resumeUrl: { type: String }, // CV link
      availability: { type: String, default: "Open to opportunities" },
    },
    social: {
      github: String,
      linkedin: String,
      twitter: String,
      telegram: String,
      facebook: String,
      gmail: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
