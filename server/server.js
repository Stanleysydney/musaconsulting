const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" })); // Allow connections from anywhere (Fixes connection errors)

// 1. Database Model
const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  problem: String,
  date: String,
  createdAt: { type: Date, default: Date.now }
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

// 2. Connect Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ MongoDB Connection Failed:", err));

// 3. Email Transporter (The Notification System)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// --- ROUTES ---

// Health Check (To prove backend is running)
app.get('/', (req, res) => {
  res.send('Backend is running and ready for 10 Million Users!');
});

// Booking Route
app.post('/api/appointments/book', async (req, res) => {
  console.log("📩 Received Booking Request:", req.body); // LOG THE REQUEST

  try {
    const { name, email, problem, date } = req.body;

    // 1. Save to Database
    const newAppt = new Appointment({ name, email, problem, date });
    await newAppt.save();
    console.log("💾 Saved to Database");

    // 2. Send Email to Patient
    await transporter.sendMail({
      from: `"Dr. Musa Ashraf" <${process.env.EMAIL_USER}>`,
      to: email, // The user's email
      subject: `Appointment Confirmed: ${date}`,
      text: `Hello ${name},\n\nYour appointment with Dr. Musa Ashraf has been confirmed for ${date}.\n\nYour Note: "${problem}"\n\nPlease log in to the dashboard 10 minutes prior.\n\nBest,\nMusaConsulting Team`
    });
    console.log(`✅ Email sent to Patient: ${email}`);

    // 3. Send Email to Doctor (You)
    await transporter.sendMail({
      from: `"System Alert" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sends to you
      subject: `New Patient: ${name}`,
      text: `New booking received for ${date}.\nPatient: ${name}\nEmail: ${email}\nProblem: ${problem}`
    });
    console.log(`✅ Email sent to Doctor`);

    res.json({ success: true, message: "Booking complete and emails sent." });

  } catch (error) {
    console.error("❌ Booking Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));