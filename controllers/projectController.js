import Project from "../models/Project.js";

export const listProjects = async (req, res, next) => {
  try {
    const { category, q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q) filter.title = { $regex: q, $options: "i" };
    const docs = await Project.find(filter).sort({ priority: -1, createdAt: -1 });
    res.json(docs);
  } catch (e) { next(e); }
};

export const createProject = async (req, res, next) => {
  try { res.status(201).json(await Project.create(req.body)); }
  catch (e) { next(e); }
};

export const updateProject = async (req, res, next) => {
  try { res.json(await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (e) { next(e); }
};

export const deleteProject = async (req, res, next) => {
  try { await Project.findByIdAndDelete(req.params.id); res.json({ ok: true }); }
  catch (e) { next(e); }
};
