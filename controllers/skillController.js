import Skill from "../models/Skill.js";

export const listSkills = async (req, res, next) => {
  try {
    const { category, sortBy = "priority", order = "desc", q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q) filter.name = { $regex: q, $options: "i" };

    const sortMap = {
      priority: { priority: order === "asc" ? 1 : -1 },
      proficiency: { proficiency: order === "asc" ? 1 : -1 },
      years: { yearsExp: order === "asc" ? 1 : -1 },
      name: { name: order === "asc" ? 1 : -1 }
    };

    const skills = await Skill.find(filter).sort(sortMap[sortBy] || sortMap.priority);
    res.json(skills);
  } catch (e) { next(e); }
};

export const createSkill = async (req, res, next) => {
  try { res.status(201).json(await Skill.create(req.body)); }
  catch (e) { next(e); }
};

export const updateSkill = async (req, res, next) => {
  try { res.json(await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (e) { next(e); }
};

export const deleteSkill = async (req, res, next) => {
  try { await Skill.findByIdAndDelete(req.params.id); res.json({ ok: true }); }
  catch (e) { next(e); }
};
