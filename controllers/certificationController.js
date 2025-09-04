import Certification from "../models/Certification.js";

export const listCerts = async (req, res, next) => {
  try {
    const { tag } = req.query;
    const filter = tag ? { tags: tag } : {};
    const docs = await Certification.find(filter).sort({ priority: -1, issueDate: -1 });
    res.json(docs);
  } catch (e) { next(e); }
};

export const createCert = async (req, res, next) => {
  try { res.status(201).json(await Certification.create(req.body)); }
  catch (e) { next(e); }
};

export const updateCert = async (req, res, next) => {
  try { res.json(await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (e) { next(e); }
};

export const deleteCert = async (req, res, next) => {
  try { await Certification.findByIdAndDelete(req.params.id); res.json({ ok: true }); }
  catch (e) { next(e); }
};
