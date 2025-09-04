import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: String, // URL
  startDate: Date,
  endDate: Date,
  description: { type: String, required: true },
  techStack: [String],
  category: { 
    type: String, 
    enum: [
      "MERN", 
      "Data Engineer", 
      "Data Analytics", 
      "React", 
      "Python", 
      "Java", 
      "Artificial Intelligence", 
      "Machine Learning", 
      "AWS", 
      "SQL", 
      "IT Support Projects"
    ], 
    default: "MERN" 
  },
  liveUrl: String,
  githubUrl: String,
  caseStudyUrl: String, // blog/medium link
  images: [String],
  highlights: [String],
  priority: { type: Number, default: 0 }
}, { timestamps: true });

// Indexing by category and priority for faster querying
projectSchema.index({ category: 1, priority: -1 });

export default mongoose.model("Project", projectSchema);
