import nodemailer from "nodemailer";

let transporter;

function getEmailUser() {
  return process.env.SMTP_USER || process.env.EMAIL_USER;
}

function getEmailPass() {
  return process.env.SMTP_PASS || process.env.EMAIL_PASS;
}

export function hasEmailConfig() {
  return Boolean((process.env.SMTP_HOST && getEmailUser() && getEmailPass()) || (process.env.EMAIL_USER && process.env.EMAIL_PASS));
}

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  if (process.env.SMTP_HOST && getEmailUser() && getEmailPass()) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: getEmailUser(),
        pass: getEmailPass()
      }
    });
    return transporter;
  }

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  return transporter;
}

export async function sendEmail({ to, subject, text, replyTo }) {
  const activeTransporter = getTransporter();

  if (!activeTransporter) {
    return { sent: false, reason: "not_configured" };
  }

  try {
    await activeTransporter.sendMail({
      from: process.env.EMAIL_FROM || `"MusaConsulting" <${getEmailUser()}>`,
      to,
      subject,
      text,
      replyTo
    });
    return { sent: true };
  } catch (error) {
    console.error("MusaConsulting email delivery failed", error);
    return { sent: false, reason: "delivery_failed" };
  }
}
