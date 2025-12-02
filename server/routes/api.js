const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailService');

// --- AUTH ---
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Send Welcome Email
    await sendEmail(email, "Welcome to MusaConsulting", `Hello ${name},\n\nThank you for registering with Dr. Musa Ashraf. Your account is active.`);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    // Send Login Notification
    await sendEmail(email, "New Login Detected", `Hello ${user.name},\n\nA new login was detected on your MusaConsulting account.`);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// --- BOOKING & PAYMENTS ---
router.post('/appointments/book', async (req, res) => {
  try {
    const { userId, date, type, notes } = req.body;
    const newAppt = new Appointment({ userId, date, type, notes });
    await newAppt.save();
    res.json({ appointmentId: newAppt._id, message: "Appointment Created" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/appointments/pay', async (req, res) => {
  try {
    const { appointmentId, paymentId } = req.body;
    const appt = await Appointment.findById(appointmentId);
    if(!appt) return res.status(404).json("Not found");

    appt.isPaid = true;
    appt.status = "Confirmed";
    appt.paymentId = paymentId;
    await appt.save();

    // Notify User
    const user = await User.findById(appt.userId);
    await sendEmail(user.email, "Payment Confirmed", `Your appointment with Dr. Musa on ${appt.date} is confirmed.`);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;