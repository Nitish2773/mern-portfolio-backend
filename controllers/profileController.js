import Profile from "../models/Profile.js";

// GET: /profile
export const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne().lean();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

// PUT: /profile
export const upsertProfile = async (req, res, next) => {
  try {
    const body = req.body;

    // Find existing profile or create new one
    const profile = await Profile.findOneAndUpdate(
      {},
      body,
      {
        upsert: true,            // create if not exists
        new: true,               // return updated doc
        runValidators: true,     // ensure schema validation
        setDefaultsOnInsert: true
      }
    );

    res.json(profile);
  } catch (err) {
    // handle validation errors gracefully
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
};
