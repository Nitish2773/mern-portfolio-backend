import Education from "../models/Education.js";

export const listEducation = async (req, res, next) => {
  try {
    const docs = await Education.find().sort({ priority: -1, startDate: -1 });
    res.json(docs);
  } catch (e) { next(e); }
};

export const createEducation = async (req, res, next) => {
  try { res.status(201).json(await Education.create(req.body)); }
  catch (e) { next(e); }
};

export const updateEducation = async (req, res, next) => {
  try { res.json(await Education.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (e) { next(e); }
};

export const deleteEducation = async (req, res, next) => {
  try { await Education.findByIdAndDelete(req.params.id); res.json({ ok: true }); }
  catch (e) { next(e); }
};
