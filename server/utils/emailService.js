const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    // Configure this with your actual email provider
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MusaConsulting" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.log("❌ Email failed (Check .env credentials):", error.message);
  }
};

module.exports = sendEmail;