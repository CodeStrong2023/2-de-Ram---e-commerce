import __dirname from "../../dirname.js";
import envs from "../config/envs.config.js";
import nodemailer from "nodemailer";

export const sendMail = async (email, subject, message, template) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "profeluismeradev@gmail.com",
      pass: envs.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "profeluismeradev@gmail.com",
    to: email,
    subject,
    text: message,
    html: template,
  });
};
