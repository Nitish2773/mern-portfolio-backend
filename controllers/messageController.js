import Message from "../models/Message.js";
import nodemailer from "nodemailer";

const mailer = () => {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
};

export const submitMessage = async (req, res, next) => {
  try {
    const doc = await Message.create(req.body);
    // optional email
    const tx = mailer();
    if (tx && process.env.MAIL_TO) {
      await tx.sendMail({
        from: `"Portfolio Bot" <${process.env.SMTP_USER}>`,
        to: process.env.MAIL_TO,
        subject: `New message from ${doc.name}`,
        text: `${doc.message}\n\nFrom: ${doc.email}`,
      });
    }
    res.status(201).json({ ok: true });
  } catch (e) { next(e); }
};

export const listMessages = async (req, res, next) => {
  try { res.json(await Message.find().sort({ createdAt: -1 })); }
  catch (e) { next(e); }
};

export const markRead = async (req, res, next) => {
  try { res.json(await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true })); }
  catch (e) { next(e); }
};
