import mongoose from "mongoose";

export const SKILL_CATEGORIES = ["web-dev", "database", "frameworks", "libraries","tools","Other" ];

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },      // "React", "AWS S3"
  logo: { type: String },                      // icon URL
  category: { type: String, enum: SKILL_CATEGORIES, required: true },
  proficiency: { type: Number, min: 1, max: 100, default: 70 }, // for sort bars
  yearsExp: { type: Number, min: 0, default: 0 },
  tags: [String],                               // ["frontend","hooks"]
  priority: { type: Number, default: 0 }        // custom sort
}, { timestamps: true });

skillSchema.index({ name: 1, category: 1 });

export default mongoose.model("Skill", skillSchema);
