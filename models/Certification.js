import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    provider: { type: String, required: true }, // e.g., AWS, Meta, Google
    title: { type: String, required: true }, // e.g., AWS Cloud Practitioner
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date },
    credentialId: String,
    verifyUrl: String, // official link
    image: String, // badge image URL
    tags: [String], // ["aws","data-engineer"]

    // 🔹 New category field
    category: {
      type: String,
      enum: [
        "NxtWave",
        "HackerRank",
        "Google",
        "Microsoft",
        "Meta",
        "Coursera Badges",
        "AWS",
        "MongoDB University",
        "Oracle SQL",
        "Other",
      ],
      required: true,
    },

    priority: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Certification", certificationSchema);
