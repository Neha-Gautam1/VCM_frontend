import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { query } from "../config/db.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Fills {{placeholders}} in a template string with real values —
// same substitution logic as the frontend's renderPreview() in EmailTemplates.jsx
const renderTemplate = (text, data) => {
  let output = text;
  Object.entries(data).forEach(([key, val]) => {
    output = output.replaceAll(`{{${key}}}`, val ?? "");
  });
  return output;
};

// Fetches a template by key from the database and sends it with the given data.
// Fails silently into the console rather than throwing — a failed email should
// never block the actual action (e.g. a user is still created even if the welcome email fails).
export const sendTemplatedEmail = async (templateKey, toEmail, data) => {
  try {
    const result = await query(
      "SELECT subject, body FROM email_templates WHERE template_key = $1",
      [templateKey]
    );

    if (result.rows.length === 0) {
      console.warn(`Email template "${templateKey}" not found — skipping send.`);
      return;
    }

    const { subject, body } = result.rows[0];

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: toEmail,
      subject: renderTemplate(subject, data),
      text: renderTemplate(body, data),
    });

    console.log(`Email sent: "${templateKey}" -> ${toEmail}`);
  } catch (err) {
    console.error(`Failed to send "${templateKey}" email to ${toEmail}:`, err.message);
  }
};

// Verify SMTP connection on server startup — surfaces config problems early
export const verifyMailer = async () => {
  try {
    await transporter.verify();
    console.log("SMTP connection verified — email sending is ready");
  } catch (err) {
    console.warn("SMTP connection failed — emails will not send:", err.message);
  }
};