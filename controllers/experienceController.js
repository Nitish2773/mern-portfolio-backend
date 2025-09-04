import Experience from "../models/Experience.js";

export const listExperience = async (req, res, next) => {
  try {
    const docs = await Experience.find().sort({ priority: -1, startDate: -1 });
    res.json(docs);
  } catch (e) { next(e); }
};

export const createExperience = async (req, res, next) => {
  try { res.status(201).json(await Experience.create(req.body)); }
  catch (e) { next(e); }
};

export const updateExperience = async (req, res, next) => {
  try { res.json(await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (e) { next(e); }
};

export const deleteExperience = async (req, res, next) => {
  try { await Experience.findByIdAndDelete(req.params.id); res.json({ ok: true }); }
  catch (e) { next(e); }
};
